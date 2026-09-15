---
name: nextjs-seo-master
description: Engenharia avançada de SEO para Next.js App Router, dados estruturados Schema.org (JSON-LD), sitemap.ts, robots.ts, Open Graph dinâmico e otimização de Core Web Vitals (LCP, CLS, INP) para ranqueamento no topo do Google.
---

# Skill: Next.js Advanced SEO & Core Web Vitals Optimization

Esta skill define os padrões e receitas técnicas para garantir que qualquer aplicação ou landing page construída em Next.js alcance pontuação máxima no Google Lighthouse (100/100 em SEO e Performance) e seja indexada com rich snippets no topo das buscas orgânicas.

---

## 1. DADOS ESTRUTURADOS COM SCHEMA.ORG (JSON-LD)

Rich Snippets aumentam a taxa de clique (CTR) em até 35%. Insira dados estruturados nativamente no `app/layout.tsx` ou em páginas individuais:

```typescript
// components/JsonLd.tsx
export default function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Exemplo em app/page.tsx (Landing Page SaaS):
export default function HomePage() {
  const saasSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MeuSaaS Pro",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "49.00",
      "priceCurrency": "BRL"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como funciona o teste gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você tem 14 dias de teste grátis sem necessidade de cartão de crédito."
        }
      }
    ]
  };

  return (
    <main>
      <JsonLd data={saasSchema} />
      <JsonLd data={faqSchema} />
      {/* Conteúdo da página */}
    </main>
  );
}
```

---

## 2. METADADOS COMPLETOS & OPEN GRAPH NO APP ROUTER

Configure o objeto `metadata` no `layout.tsx` base e exporte `generateMetadata()` em páginas dinâmicas:

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://meudominio.com.br'),
  title: {
    default: 'MeuSaaS | Plataforma de Alta Performance',
    template: '%s | MeuSaaS'
  },
  description: 'Automatize seus processos e escale seu negócio com máxima segurança e velocidade.',
  keywords: ['SaaS', 'Automação', 'Produtividade', 'Gestão Empresarial'],
  authors: [{ name: 'Sua Empresa', url: 'https://meudominio.com.br' }],
  creator: 'Sua Empresa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://meudominio.com.br',
    title: 'MeuSaaS | Plataforma de Alta Performance',
    description: 'Automatize seus processos e escale seu negócio.',
    siteName: 'MeuSaaS',
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'MeuSaaS Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeuSaaS | Plataforma de Alta Performance',
    description: 'Automatize seus processos e escale seu negócio.',
    creator: '@meusaas',
    images: ['/og-banner.png'],
  },
  alternates: {
    canonical: 'https://meudominio.com.br',
  },
};
```

---

## 3. GERAÇÃO AUTOMÁTICA DE SITEMAP.TS E ROBOTS.TS

O Next.js App Router gera arquivos XML e TXT automaticamente a partir de rotas TypeScript nativas:

### `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://meudominio.com.br';

  // Rotas estáticas
  const routes = [
    '',
    '/pricing',
    '/features',
    '/about',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Exemplo de integração com rotas dinâmicas (posts, produtos)
  // const posts = await getPostsFromApi();
  // const dynamicRoutes = posts.map(post => ({ ... }));

  return [...routes];
}
```

### `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/private/'],
      },
    ],
    sitemap: 'https://meudominio.com.br/sitemap.xml',
  };
}
```

---

## 4. BLINDAGEM DE CORE WEB VITALS (FATOR DE RANQUEAMENTO Nº 1)

1. **LCP (Largest Contentful Paint < 2.5s)**:
   - Carregue fontes locais ou do Google Font via `next/font/google` com display `swap`:
     ```typescript
     import { Inter } from 'next/font/google';
     const inter = Inter({ subsets: ['latin'], display: 'swap' });
     ```
   - Em banners de topo (Hero images), utilize mandatoriamente o atributo `priority`:
     ```tsx
     <Image
       src="/hero-banner.webp"
       alt="Dashboard Ilustrativo do MeuSaaS"
       width={1200}
       height={600}
       priority
     />
     ```
2. **CLS (Cumulative Layout Shift = 0.00)**:
   - Sempre forneça `width` e `height` explícitos em todas as tags `Image`.
   - Utilize containers com `aspect-ratio` fixo para vídeos ou carrosséis.
   - Reserve espaço para componentes dinâmicos usando esqueletos animados (Skeletons) com dimensões idênticas ao conteúdo carregado.
3. **INP (Interaction to Next Paint < 200ms)**:
   - Isole componentes pesados com `'use client'` em nós folhas (leaf components).
   - Use `useTransition()` para atualizações de estado que não bloqueiem a UI.

---

## 5. HIERARQUIA SEMÂNTICA HTML5 OBRIGATÓRIA

- Apenas **1 tag `<h1>`** por página, posicionada na Hero Section e contendo a palavra-chave primária.
- Hierarquia estrita: nunca pule de `<h1>` direto para `<h4>`.
- Uso de elementos semânticos:
  - `<header>` para a barra de navegação superior.
  - `<nav>` para blocos de links de menu.
  - `<main>` envolvendo todo o conteúdo principal da rota.
  - `<section aria-labelledby="section-id">` para blocos temáticos.
  - `<article>` para cards de posts ou depoimentos.
  - `<footer>` no rodapé da página.
- Todo link de botão (`<a>` ou `Link`) deve conter texto explicativo legível (evite links com apenas ícones sem `aria-label`).
