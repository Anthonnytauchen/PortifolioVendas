# Product Requirements Document (PRD) — Projeto TAF (Portfólio B2B de Alta Conversão)

## 1. Visão Geral e Limites do Sistema (Boundaries)
O **Projeto TAF** é uma aplicação web Mobile-First de alta conversão voltada para captação e qualificação de leads B2B (SDR/BDR) e exposição de Cases de Sucesso orientados a métricas de negócio.

- **Público-Alvo Público (Visitante / Decisor B2B):** Visualiza a proposta de valor (Hero & Serviços via `siteContent`), explora a vitrine de Cases de Sucesso com métricas de impacto real e submete o formulário de qualificação comercial.
- **Público-Alvo Autenticado (Admin TAF):** Gerencia os projetos do portfólio (`projects`) e visualiza os leads qualificados através de rotas autenticadas via JWT do Supabase.
- **Regras de UI e Conteúdo:**
  - Conformidade estrita com `UI_PATTERNS.md` (Tokens Semânticos CSS, Tipografia Escalonável, Containers `max-w-7xl`).
  - **Zero Copy Hardcoded:** Todo texto estático é importado de `@/config/siteContent.ts`.

---

## 2. Árvore de Componentes (Separação entre UI Visual e Hooks de Lógica)

```text
src/
├── config/
│   └── siteContent.ts                       # Copy estática (Hero, Serviços, Labels, CTAs)
├── components/
│   ├── ui/                                  # Componentes Visuais Puros (Stateless / Design System)
│   │   ├── Button.tsx                       # Variantes: primary e outline + suporte a isLoading (Spinner)
│   │   ├── Input.tsx                        # Input semântico + exibição de erro inline (text-destructive)
│   │   ├── Select.tsx                       # Select nativo estilizado para Enums (project_type, budget)
│   │   ├── Textarea.tsx                     # Textarea com contador/limite de 500 caracteres
│   │   ├── Badge.tsx                        # Badges para tech_stack e metric_highlight
│   │   ├── Skeleton.tsx                     # Primitivo de Skeleton (animate-pulse bg-muted)
│   │   └── Toast.tsx                        # Toast Notification global para erros HTTP 500 / Sucesso
│   └── layout/                              # Estrutura Mobile-First
│       ├── Header.tsx                       # Navegação principal e CTA rápido
│       ├── SectionContainer.tsx             # Wrapper padrão (container mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24)
│       └── Footer.tsx                       # Rodapé institucional
├── features/
│   ├── portfolio/                           # Domínio: Vitrine de Cases de Sucesso
│   │   ├── components/
│   │   │   ├── ProjectCard.tsx              # Card de projeto com imagem aspect-video, metric_highlight e tech_stack
│   │   │   ├── ProjectCardSkeleton.tsx      # Skeleton Loader idêntico ao card para evitar Layout Shift (CLS = 0)
│   │   │   └── PortfolioGrid.tsx            # Grid responsivo (1 col mobile, 2 md, 3 lg) orquestrando loading/erro/dados
│   │   ├── hooks/
│   │   │   └── useProjects.ts               # Hook de busca assíncrona + validação Zod de fronteira + disparo de Toast
│   │   └── schemas/
│   │       └── projectSchema.ts             # Schema Zod espelhando a tabela `projects` e o contrato OpenAPI
│   └── leads/                               # Domínio: Captação e Qualificação Comercial (SDR/BDR)
│       ├── components/
│       │   └── LeadCaptureForm.tsx          # Formulário B2B (Apenas JSX e binding com o hook)
│       ├── hooks/
│       │   └── useLeadCaptureForm.ts        # Estado do form, validação Zod por campo, submit assíncrono, spinner e Toast
│       └── schemas/
│           └── leadFormSchema.ts            # Regras estritas do Zod para qualificação B2B
└── pages/
    └── HomePage.tsx                         # Composição: HeroSection + ServicesSection + PortfolioGrid + LeadCaptureForm
```

---

## 3. Contrato de API e Modelagem de Dados (OpenAPI / Java Spring Boot & Supabase)

> **Regra de Contrato (`agent.md`):** Nenhuma interface de DTO deve ser escrita manualmente fora do fluxo de geração do `openapi-typescript` (`src/api/schema.d.ts`). Os schemas Zod abaixo atuam como **Validação de Fronteira (Runtime Boundary Validation)** sobre os payloads definidos no contrato OpenAPI.

### 3.1. Entidade: `projects` (Cases de Sucesso)
- **Origem:** Tabela `public.projects` no Supabase / Endpoint `GET /api/v1/projects`
- **Estrutura de Campos:**

| Campo | Tipo Banco (Postgres) | Tipo Contrato (OpenAPI / TS) | Obrigatório | Descrição |
| :--- | :--- | :--- | :---: | :--- |
| `id` | `uuid` (PK) | `string` (format: uuid) | Sim | Identificador único do projeto |
| `title` | `varchar(255)` | `string` | Sim | Ex: `'Plataforma SaaS de Gestão'` |
| `description` | `text` | `string` | Sim | Descrição focada no problema de negócio resolvido |
| `tech_stack` | `text[]` | `string[]` | Sim | Ex: `['React', 'Supabase', 'Java']` |
| `metric_highlight` | `varchar(120)` | `string` | Sim | Métrica de impacto B2B (ex: `'+40% de conversão'`, `'Lighthouse 100'`) |
| `image_url` | `text` | `string` (format: uri) | Sim | URL pública do bucket do Supabase Storage |
| `live_url` | `text` | `string \| null` (format: uri) | Não | Link externo para o projeto em produção |
| `created_at` | `timestamptz` | `string` (format: date-time) | Sim | Timestamp ISO-8601 de criação |

#### Schema Zod de Fronteira (`src/features/portfolio/schemas/projectSchema.ts`):
```typescript
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  tech_stack: z.array(z.string()).nonempty(),
  metric_highlight: z.string().min(1),
  image_url: z.string().url(),
  live_url: z.string().url().nullable().optional(),
  created_at: z.string().datetime({ offset: true }).or(z.string().min(1)),
});

export const projectListSchema = z.array(projectSchema);
```

---

### 3.2. Payload: Captação de Leads Qualificados (`leads`)
- **Destino:** Tabela `public.leads` no Supabase / Endpoint `POST /api/v1/leads`
- **Estrutura de Campos e Regras de Qualificação SDR/BDR:**

| Campo | Tipo Contrato (OpenAPI / TS) | Obrigatório | Regra de Validação Zod |
| :--- | :--- | :---: | :--- |
| `name` | `string` | Sim | Mínimo 2 caracteres (`'Nome é obrigatório'`) |
| `email` | `string` (format: email) | Sim | Formato de e-mail válido (`'E-mail corporativo inválido'`) |
| `whatsapp` | `string` | Sim | Mínimo 11 caracteres + Regex telefone BR (`'WhatsApp inválido. Informe DDD + 9 dígitos'`) |
| `project_type` | `'Novo Site' \| 'E-commerce' \| 'Sistema/SaaS'` | Sim | Enum restrito às 3 opções |
| `budget` | `'Até R$ 3.000' \| 'R$ 3.000 a R$ 8.000' \| 'Acima de R$ 8.000'` | Sim | Enum restrito às 3 faixas de qualificação |
| `details` | `string \| undefined` | Não | Opcional, máximo de 500 caracteres |

#### Schema Zod de Fronteira (`src/features/leads/schemas/leadFormSchema.ts`):
```typescript
import { z } from 'zod';

export const PROJECT_TYPES = ['Novo Site', 'E-commerce', 'Sistema/SaaS'] as const;
export const BUDGET_RANGES = ['Até R$ 3.000', 'R$ 3.000 a R$ 8.000', 'Acima de R$ 8.000'] as const;

const brPhoneRegex = /^(\+?55\s?)?(\(?\d{2}\)?\s?)?9\d{4}[-\s]?\d{4}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Nome é obrigatório' }),
  email: z
    .string()
    .trim()
    .email({ message: 'E-mail corporativo inválido' }),
  whatsapp: z
    .string()
    .trim()
    .min(11, { message: 'WhatsApp deve conter no mínimo 11 dígitos (DDD + número)' })
    .regex(brPhoneRegex, { message: 'Formato de WhatsApp inválido (ex: 11999999999)' }),
  project_type: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: 'Selecione o tipo de projeto' }),
  }),
  budget: z.enum(BUDGET_RANGES, {
    errorMap: () => ({ message: 'Selecione a faixa de orçamento estimada' }),
  }),
  details: z
    .string()
    .max(500, { message: 'Os detalhes não podem ultrapassar 500 caracteres' })
    .optional()
    .or(z.literal('')),
});
```

---

## 4. Estados Assíncronos, Tratamento de Erros e Acessibilidade

1. **Skeleton Loaders (Vitrine de Projetos):**
   - Enquanto `isLoading === true` no hook `useProjects`, o `PortfolioGrid` renderiza **3 instâncias de `ProjectCardSkeleton`** utilizando exatamente as mesmas dimensões estruturais (`rounded-xl border border-border bg-card`, `aspect-video` no topo, blocos `bg-muted animate-pulse` no corpo e rodapé), garantindo **Zero Layout Shift (CLS = 0)**.
2. **Estado de Submissão no Formulário (`LeadCaptureForm`):**
   - Durante `isSubmitting === true`, o botão de CTA primário recebe `disabled={true}` (aplicando `disabled:opacity-50`) e renderiza o ícone `<Loader2 className="mr-2 h-4 w-4 animate-spin" />` ao lado do label de envio.
3. **Erros de Validação Zod (Inline):**
   - Proibido o uso de `window.alert()`.
   - Cada campo com falha exibe imediatamente abaixo do input um `<p role="alert" className="mt-1.5 text-sm font-medium text-destructive">{errorMessage}</p>`.
4. **Erros de Servidor (HTTP 500 / Falha de Rede):**
   - Falhas de comunicação com a API/Supabase ou falhas de contrato interceptadas pelo Zod na resposta disparam o componente global **`ToastNotification`** (`variant="destructive"`), posicionado no canto inferior direito (`fixed bottom-4 right-4 z-50`), com `role="status"` / `aria-live="assertive"`.

---

## 5. Regras de Autenticação e Segurança (Supabase JWT + RLS)

1. **Gestão de Sessão:** Uso exclusivo do `@supabase/supabase-js` (`supabase.auth.getSession()`).
2. **Propagação Obrigatória de Token JWT (Bearer):**
   - Em todas as chamadas para endpoints protegidos do backend Java/Spring Boot (ex: `POST /api/v1/admin/projects`, `DELETE /api/v1/admin/projects/{id}`, `GET /api/v1/admin/leads`), o cliente HTTP injeta obrigatoriamente o header:
     ```http
     Authorization: Bearer <supabase_access_token>
     ```
3. **Políticas RLS (Row Level Security no Supabase):**
   - Tabela `projects`: `SELECT` público (`anon` e `authenticated`); `INSERT`, `UPDATE`, `DELETE` restritos a usuários autenticados com role administrativa (`authenticated`).
   - Tabela `leads`: `INSERT` público (`anon`) para permitir captação na Landing Page; `SELECT`, `UPDATE`, `DELETE` restritos exclusivamente ao painel Admin (`authenticated`).

