# Guia de Agentes AI para iagobruno.dev

Este documento fornece orientação para agentes AI (como Codex, Claude Code, OpenCode e outros) conseguirem trabalhar com a codebase. Serve como base de conhecimento para ajudar AI a entender a estrutura do projeto, convenções e requisitos.

## Visão Geral do Projeto

iagobruno.dev é um site pessoal/portfólio. O projeto utiliza Next.js, TypeScript, Tailwind CSS, MDX para criar páginas em Markdown e é hospedado no GitHub Pages.

## Estrutura do Projeto

```
iagobruno.dev/
├── app/                 # Páginas e layouts do Next.js App Router
│   ├── (pages)/         # Páginas com roteamento agrupado
│   ├── layout.tsx       # Layout raiz da aplicação
│   ├── page.tsx         # Página inicial
│   ├── providers.tsx    # Providers (Theme, PostHog, etc)
│   └── globals.css      # Estilos globais e tema Tailwind
├── components/          # Componentes React reutilizáveis
├── hooks/               # Custom React hooks
├── lib/                 # Bibliotecas e utilitários
├── public/              # Arquivos estáticos (imagens, favicons, etc.)
└── mdx-components.tsx   # Componentes customizados para MDX
```

## Stack Tecnológica

- **Framework**: Next.js 16+ com App Router
- **Linguagem**: TypeScript (strict mode com algumas exceções)
- **Estilização**: Tailwind CSS v4 com `@tailwindcss/postcss`
- **Gerenciador de Pacotes**: Bun 1.3.0+
- **Build**: Next.js com Turbopack
- **Conteúdo**: MDX para páginas em Markdown
- **Analytics**: PostHog
- **Tema**: next-themes para dark mode
- **Typografia MDX**: @tailwindcss/typography

## Comandos essenciais

```bash
bun install         # instalar dependências
bun run dev         # servidor dev com Turbopack → http://localhost:3000
bun run build       # build estático (output: 'export')
bun run lint        # next lint
bun run type-check  # tsc --noEmit (separado do build!)
bun run deploy      # build + gh-pages (usa npm run build internamente)
```

## Convenções de Código

### Diretrizes TypeScript

- Use `function` para componentes e funções nomeadas
- Use arrow functions para callbacks anônimos
- Sempre use `const` a menos que reatribuição seja necessária
- Evite tipos `any` (embora `noImplicitAny` esteja desabilitado)

### Convenções de Nomenclatura de Arquivos

- **Arquivos**: PascalCase para componentes (e.g., `Button.tsx`, `PageHeader.tsx`)
- **Hooks**: camelCase com prefixo `use` (e.g., `useInterval.ts`, `useIsMobile.ts`)
- **Utilitários**: camelCase (e.g., `utils.ts`, `getFileLastUpdate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`)

## Como Criar Novos Componentes

Crie o arquivo em `components/` com nome em PascalCase (e.g., `MeuComponente.tsx`)

Exemplo:

```tsx
import { cn } from '@/lib/utils';

type ComponentProps = {
  className?: string;
  // ...
};

export default function Component({ className, ...rest }: ComponentProps) {
  const [state, setState] = useState();

  function handleClick() {
    // ...
  }

  return (
    <div className={cn('base-classes', className)} {...rest}>
      {/* Conteúdo */}
    </div>
  );
}
```

### Client Components

Se o componente precisa de interatividade, adicione `'use client'` no topo:

```tsx
'use client';
import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  // ...
}
```

## Como Criar Novas Páginas em MDX

As páginas MDX ficam em `app/(pages)/[slug]/page.mdx`:

1. Importar componentes necessários no topo do arquivo
2. Exportar metadata para SEO e título da página
3. Usar componentes React diretamente no MDX
4. Escrever conteúdo em Markdown normalmente

Exemplo:

```mdx
import PageHeader from '@/components/PageHeader';
import getFileLastUpdateDate from '@/lib/getFileLastUpdate';

export const metadata = {
  title: 'Título da Página',
};

export const lastUpdate = getFileLastUpdateDate(import.meta.url);

<PageHeader
  overline="Subtítulo"
  heading="Título Principal"
  subHeading={`Atualizado em ${lastUpdate}`}
/>

## Seção

Conteúdo em markdown aqui.

<ul>
  {items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

### Layout Compartilhado

Todas as páginas em `app/(pages)/` compartilham o layout definido em `app/(pages)/layout.tsx`, que inclui:

- Componente `Hero.tsx` (versão compacta com logo e nav links)
- Largura máxima de conteúdo responsiva

## Como Estilizar o App

O projeto usa Tailwind CSS v4 com configuração via CSS em `app/globals.css`:

### Convenções de Estilização

- Use utilitários do Tailwind CSS.
- Use a função `cn()` de `@/lib/utils` para classes condicionais se necessário.
- Use `gap-*` para espaçamento consistente em containers flex/grid.
- Evite estilos inline a menos que sejam dinâmicos.
- Siga design mobile-first responsivo.

```tsx
// Bom
<div className="flex items-center gap-4 md:gap-8 md:flex-col">

// Evitar
<div style={{ display: 'flex', gap: '1rem' }}>
```

### Estilização Condicional com `cn()`

A função `cn()` combina e mescla classes Tailwind sem conflitos:

```tsx
import { cn } from '@/lib/utils'

// Uso básico
<div className={cn('base-class', condition && 'conditional-class')} />

// Com objeto
<div className={cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled
})} />

// Múltiplas condições
<div className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  variant === 'secondary' && 'secondary-class',
  className // Props externas
)} />
```

### Classes Customizadas

O projeto usa algumas classes utilitárias customizadas:

- `px-safe-offset-*`: Padding horizontal com safe area
- `prose`: Classes do plugin typography para conteúdo MDX
- Variáveis CSS: `--max-content-width`

### Dark Mode

O dark mode usa seletores baseados em classe:

```tsx
<div className="bg-white dark:bg-neutral-950">
  <p className="text-black dark:text-white">Texto</p>
</div>
```

### Cor primária

A cor primária do projeto é definida pela variável CSS `--color-primary` em `app/globals.css` que pode ser usada no Tailwind como `text-primary`, `bg-primary`, `border-primary`, `fill-primary`, entre outros.

## Deploy e Hospedagem

O site é hospedado no GitHub Pages e o deploy é feito automaticamente via GitHub Actions ou manualmente via comando:

```bash
# Build e deploy para GitHub Pages
bun run deploy
```

## Padrões Comuns

### Busca de Dados

```tsx
// Server Component (async)
async function ServerComponent() {
  const data = await fetchData();
  return <div>{/* Render data */}</div>;
}

// Client Component (com hooks)
('use client');
function ClientComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{/* Render data */}</div>;
}
```

### Metadados de Página

```tsx
// Em páginas TSX
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Título da Página',
};

// Em páginas MDX
export const metadata = {
  title: 'Título da Página',
};
```

### Uso de Ícones

O projeto usa `react-icons`:

```tsx
import { LuArrowUpRight as LinkArrow } from 'react-icons/lu';

<LinkArrow className="ml-1 inline" />;
```

## Considerações de Segurança

- Valide todas as entradas do usuário
- Sanitize dados antes de renderizar
- Nunca exponha dados sensíveis em código cliente
- Use HTTPS em produção
