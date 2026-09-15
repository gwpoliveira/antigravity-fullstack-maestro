---
name: qa-automated-testing
description: Engenharia de testes automatizados com Pytest-Django, FactoryBoy, testes de API REST, cobertura de regras de negócio, testes de isolamento multi-tenant e testes E2E com Playwright.
---

# Skill: QA & Automated Testing Suite

Esta skill define a arquitetura, padrões e rotinas de validação de qualidade de software, cobrindo testes unitários, testes de integração de API e testes de ponta a ponta (E2E).

---

## 1. SUÍTE DE TESTES BACKEND (PYTEST-DJANGO)

Toda funcionalidade desenvolvida no backend deve possuir testes cobrindo o "caminho feliz" (happy path) e cenários de erro/fronteira.

### Configuração Recomendada (`pytest.ini`):
```ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings.test
python_files = tests.py test_*.py *_tests.py
addopts = --nomigrations --reuse-db -v --strict-markers
```

### Padrão de Fixtures e Factories (`conftest.py` & `factories.py`):
```python
import pytest
import factory
from django.contrib.auth import get_user_model
from apps.tenants.models import Tenant
from apps.products.models import Product

User = get_user_model()

class TenantFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tenant
    name = factory.Faker("company")
    slug = factory.Faker("slug")

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    username = factory.Faker("user_name")
    email = factory.Faker("email")

@pytest.fixture
def tenant(db):
    return TenantFactory()

@pytest.fixture
def auth_client(db, client, tenant):
    user = UserFactory()
    client.force_login(user)
    client.tenant = tenant
    return client
```

---

## 2. TESTES DE ISOLAMENTO MULTI-TENANT (CRÍTICO)

O teste mais importante em um SaaS é garantir que o Cliente A nunca consiga visualizar, atualizar ou deletar dados do Cliente B:

```python
import pytest
from rest_framework import status

@pytest.mark.django_db
def test_cross_tenant_isolation(auth_client):
    tenant_a = auth_client.tenant
    tenant_b = TenantFactory()

    # Cria pedido no Tenant B
    order_b = OrderFactory(tenant=tenant_b)

    # Tenta acessar o pedido do Tenant B com o cliente autenticado no Tenant A
    response = auth_client.get(f"/api/v1/orders/{order_b.id}/")

    # Deve retornar estritamente 404 (Not Found) para não vazar a existência do recurso
    assert response.status_code == status.HTTP_404_NOT_FOUND
```

---

## 3. TESTES DE TRANSAÇÃO E CONCORRÊNCIA

Valide se regras financeiras e limites de estoque respeitam atomicidade:

```python
import pytest
from apps.orders.services import process_order_checkout

@pytest.mark.django_db(transaction=True)
def test_stock_cannot_go_negative(tenant, user):
    product = ProductFactory(tenant=tenant, stock_quantity=1, unit_price=100)

    # Simula requisições com quantidade superior ao estoque
    with pytest.raises(ValueError, match="Estoque insuficiente"):
        process_order_checkout(
            tenant=tenant,
            customer=user,
            item_requests=[{"product_id": product.id, "quantity": 2}]
        )

    product.refresh_from_db()
    assert product.stock_quantity == 1 # Estoque permaneceu inalterado
```

---

## 4. TESTES E2E COM PLAYWRIGHT (FLUXOS CRÍTICOS FRONTEND)

O QA implementa testes de interface e jornada do usuário:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Fluxo Crítico de Checkout', () => {
  test('Usuário adiciona produto ao carrinho e finaliza com sucesso', async ({ page }) => {
    await page.goto('/catalog');

    // Seleciona produto
    const addToCartBtn = page.getByTestId('add-to-cart-btn').first();
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Abre gaveta do carrinho
    await page.getByTestId('cart-drawer-trigger').click();
    await expect(page.getByTestId('cart-total-value')).toBeVisible();

    // Procede para checkout
    await page.getByTestId('proceed-checkout-btn').click();
    await expect(page).toHaveURL(/.*checkout/);

    // Preenche dados e confirma
    await page.getByLabel('Nome no Cartão').fill('João da Silva');
    await page.getByTestId('pay-order-btn').click();

    // Validação de confirmação
    await expect(page.getByTestId('order-success-screen')).toBeVisible();
  });
});
```

---

## 5. CHECKLIST DE DEFINITION OF DONE (DOD) DO QA

- [ ] Todos os testes unitários passando sem warnings.
- [ ] Cobertura de código superior a 80% nos módulos de domínio (`models`, `services`, `views`).
- [ ] Testes de isolamento Cross-Tenant aprovados.
- [ ] Testes de validação de payload inválido (400 Bad Request) cobrindo todos os endpoints.
- [ ] Relatório sintético gerado para inspeção do Subagente Guardian.
