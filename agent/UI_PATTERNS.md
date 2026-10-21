# Instruções de Sistema: Dicionário de Padrões UI (UI_PATTERNS)

## 1. Regra de Ouro da Estilização
É ESTRITAMENTE PROIBIDO utilizar cores hardcoded do Tailwind (como `bg-blue-600`, `text-gray-900`, `text-white`). Toda a interface deve ser construída utilizando **Tokens Semânticos** para permitir a troca de temas no futuro.
- **Fundo da Página/Containers:** `bg-background` e `bg-muted`
- **Textos Base:** `text-foreground` e `text-muted-foreground`
- **Elementos de Conversão/Marca:** `bg-primary`, `text-primary`, `text-primary-foreground`
- **Bordas e Divisórias:** `border-border`

## 2. Tipografia Escalonável
Mantenha a consistência de hierarquia visual. Nunca invente tamanhos novos de fonte. Use o padrão abaixo:
- **Headline (H1 - Hero Section):** `text-4xl font-extrabold tracking-tight lg:text-5xl`
- **Títulos de Seção (H2):** `text-3xl font-semibold tracking-tight transition-colors first:mt-0`
- **Títulos de Cards/Projetos (H3):** `text-2xl font-semibold leading-none tracking-tight`
- **Corpo de Texto Padrão (Parágrafos):** `text-base text-muted-foreground leading-7`
- **Badges e Labels Pequenas:** `text-sm font-medium leading-none`

## 3. Espaçamento e Layout (Mobile-First)
- **Containers Globais:** Todo conteúdo principal deve ser encapsulado dentro de um layout máximo para não quebrar em monitores Ultrawide. Use `container mx-auto px-4 md:px-8 max-w-7xl`.
- **Respiro entre Seções:** As seções da Landing Page (Hero, Serviços, Portfólio) DEVEM usar o padding vertical padrão: `py-16 md:py-24`.
- **Grids e Listas:** O espaçamento padrão entre itens de um grid é `gap-4` no mobile e `gap-6` no desktop. Exemplo: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

## 4. Estrutura de Componentes Críticos
Sempre que for gerar os elementos abaixo, obedeça a esta estrutura exata de classes Tailwind:

### A. Botões (CTAs de Vendas)
- **Botão Primário:** `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 py-2`
- **Botão Secundário (Outline):** `border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2 rounded-md`

### B. Cards (Vitrine de Projetos do Portfólio)
Os projetos devem ter um aspecto premium, focado na imagem da tela do sistema.
- **Container do Card:** `rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col`
- **Imagem de Capa:** `aspect-video w-full object-cover object-top border-b border-border`
- **Corpo do Card (Título e Descrição):** `p-6 flex flex-col gap-3 flex-1`
- **Rodapé (Badges de Tech e Links):** `p-6 pt-0 flex items-center justify-between`

## 5. Regras de Consumo de Dados e Textos
- **Zero Copy Hardcoded:** Nenhum texto de apresentação, título ou chamada comercial (CTA) deve ser escrito diretamente no HTML do componente React.
- **Importação Obrigatória:** Importe o objeto `siteContent` de `@/config/siteContent.ts` para preencher os textos estáticos (como a Hero Section e Serviços).
- **Dados Dinâmicos:** A listagem de projetos consumirá a API/Supabase. Os dados simulados (mocks via MSW) devem possuir o mesmo contrato (OpenAPI) gerado pelo backend.

## 6. Formulários e Validação (Zod)
Todo formulário (Contato de Leads ou Painel Admin) deve seguir as regras de acessibilidade e tratamento de erro visual:
- **Labels:** `text-sm font-medium leading-none`
- **Inputs e Textareas:** `flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
- **Tratamento de Erros:** Qualquer falha capturada pelo `zod` DEVE ser renderizada imediatamente abaixo do input, utilizando `text-sm font-medium text-red-500` (ou sua variável de cor destrutiva).