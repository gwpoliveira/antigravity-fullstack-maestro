---
name: django-mysql-saas
description: Padrões de engenharia avançados para Python, Django, Django Ninja / DRF, MySQL de alta performance, arquitetura Multi-tenant SaaS, transações atômicas com locks, otimização de queries e filas Celery.
---

# Skill: Django & MySQL High-Performance SaaS Engine

Esta skill estabelece os padrões técnicos definitivos para construção de backends corporativos, plataformas SaaS Multi-tenant e motores transacionais de E-commerce com Django e MySQL.

---

## 1. ISOLAMENTO MULTI-TENANT (ANTI-CROSS-TENANT LEAK)

Todo sistema SaaS deve garantir isolamento de dados no nível de modelo e de query:

```python
import uuid
from django.db import models
from django.core.exceptions import PermissionDenied

class Tenant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TenantManager(models.Manager):
    """Filtra automaticamente os registros pelo tenant ativo do contexto."""
    def for_tenant(self, tenant):
        if not tenant:
            raise PermissionDenied("Acesso negado: Tenant obrigatório não informado.")
        return self.get_queryset().filter(tenant=tenant)

class TenantBaseModel(models.Model):
    """Classe base obrigatória para todas as entidades de domínio do cliente."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="%(class)ss", db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = TenantManager()

    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=["tenant", "created_at"]),
        ]
```

---

## 2. OTIMIZAÇÃO MYSQL: PREVENÇÃO DO N+1 E ÍNDICES COMPOSTOS

### Regras de Consulta:
1. **Relações 1:1 e N:1**: Use obrigatoriamente `select_related()` (faz `JOIN` no MySQL).
2. **Relações N:N e Reversas (1:N)**: Use `prefetch_related()` (faz queries em lote com `WHERE IN (...)`).
3. **Contagem e Agregações**: Nunca faça `len(queryset)`; use `queryset.count()` ou `queryset.aggregate()`.
4. **Campos Específicos**: Em endpoints pesados, restrinja colunas com `only('id', 'name', 'slug')` ou `values_list()`.

```python
# Exemplo Otimizado de Listagem
def get_orders_for_dashboard(tenant):
    return (
        Order.objects.for_tenant(tenant)
        .select_related("customer", "shipping_address")
        .prefetch_related("items__product")
        .filter(status__in=["PAID", "PROCESSING"])
        .order_by("-created_at")[:50]
    )
```

---

## 3. TRANSAÇÕES ATÔMICAS E CONTROLE DE CONCORRÊNCIA

Em rotas de pagamento, checkout de estoque ou liquidação financeira, use **`select_for_update()`** para evitar *Race Conditions*:

```python
from django.db import transaction
from decimal import Decimal

@transaction.atomic
def process_order_checkout(tenant, customer, item_requests):
    total_amount = Decimal("0.00")
    order_items = []

    # Bloqueia as linhas de estoque no MySQL durante a transação
    for item in item_requests:
        product = (
            Product.objects.select_for_update()
            .for_tenant(tenant)
            .get(id=item["product_id"])
        )
        
        if product.stock_quantity < item["quantity"]:
            raise ValueError(f"Estoque insuficiente para o produto: {product.name}")
        
        # Debita estoque
        product.stock_quantity -= item["quantity"]
        product.save(update_fields=["stock_quantity"])
        
        subtotal = product.unit_price * item["quantity"]
        total_amount += subtotal
        order_items.append((product, item["quantity"], product.unit_price))

    order = Order.objects.create(
        tenant=tenant,
        customer=customer,
        total_amount=total_amount,
        status="PENDING",
    )

    OrderItem.objects.bulk_create([
        OrderItem(order=order, product=prod, quantity=qty, unit_price=price)
        for prod, qty, price in order_items
    ])

    return order
```

---

## 4. IDEMPOTÊNCIA DE WEBHOOKS (PAGAMENTOS & INTEGRAÇÕES)

Nunca processe o mesmo evento de webhook duas vezes:

```python
class ProcessedWebhookEvent(models.Model):
    event_id = models.CharField(max_length=255, unique=True, db_index=True)
    provider = models.CharField(max_length=50) # stripe, mercadopago, etc.
    payload = models.JSONField()
    processed_at = models.DateTimeField(auto_now_add=True)

def handle_incoming_webhook(event_id, provider, payload, handler_fn):
    created = ProcessedWebhookEvent.objects.filter(event_id=event_id).exists()
    if created:
        return {"status": "ignored", "reason": "Already processed"}

    with transaction.atomic():
        ProcessedWebhookEvent.objects.create(
            event_id=event_id,
            provider=provider,
            payload=payload
        )
        handler_fn(payload)

    return {"status": "success"}
```

---

## 5. PROCESSAMENTO ASSÍNCRONO COM CELERY & REDIS

- Configure tarefas Celery com `acks_late=True` e `retry_backoff=True`.
- Passe sempre IDs primários (`str(order.id)`) nas tasks, nunca instâncias completas de modelos Django.
- Limite timeouts de execução para evitar workers travados.
