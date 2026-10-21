export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  metricBadge: string;
}

export const siteContent = {
  brand: {
    initials: 'TAF',
    name: 'Anthonny Tauchen',
    tagline: 'Engenharia de Software',
  },
  header: {
    navItems: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Cases de Sucesso', href: '#cases' },
      { label: 'Processo', href: '#processo' },
      { label: 'Contato Comercial', href: '#contato' },
    ] as NavItem[],
    ctaLabel: 'Solicitar Diagnóstico',
    ctaHref: '#contato',
    mainNavAriaLabel: 'Navegação Principal',
    mobileNavAriaLabel: 'Navegação Mobile',
    mobileMenuAriaLabel: 'Alternar menu de navegação',
  },
  hero: {
    badge: 'Arquitetura Escalável • Foco em ROI B2B',
    headline: 'Transformamos gargalos operacionais em plataformas web de alta conversão.',
    subheadline:
      'Projetamos e desenvolvemos ecossistemas digitais sob medida — de landing pages orientadas a performance até plataformas SaaS completas em React, Java e Supabase.',
    primaryCta: {
      label: 'Agendar Consultoria Técnica',
      href: '#contato',
    },
    secondaryCta: {
      label: 'Explorar Cases e Métricas',
      href: '#cases',
    },
    highlights: [
      { value: '+40%', label: 'Aumento médio em conversão de leads B2B' },
      { value: '100/100', label: 'Performance Core Web Vitals & Lighthouse' },
      { value: '< 90 dias', label: 'Time-to-market médio para MVPs empresariais' },
    ],
  },
  services: {
    sectionBadge: 'Nossas Soluções',
    title: 'Engenharia orientada a resultados comerciais',
    subtitle:
      'Cada linha de código é projetada para reduzir o Custo de Aquisição de Clientes (CAC) e escalar a operação da sua empresa.',
    items: [
      {
        id: 'high-conversion-sites',
        title: 'Posicionamento & Sites B2B de Alta Conversão',
        description:
          'Páginas ultra-rápidas com arquitetura de informação persuasiva, carregamento instantâneo e integração nativa com seu CRM.',
        deliverables: ['Design System Semântico', 'SEO Técnico Avançado', 'Qualificação SDR Integrada'],
        metricBadge: 'Lighthouse 100',
      },
      {
        id: 'b2b-ecommerce',
        title: 'E-commerce B2B & Portais de Atacado',
        description:
          'Experiências de compra fluidas para pedidos recorrentes, tabelas de preço dinâmicas por CNPJ e checkout otimizado.',
        deliverables: ['Catálogo de Alta Performance', 'Integração ERP / Gateways', 'Checkout sem Fricção'],
        metricBadge: '+35% Ticket Médio',
      },
      {
        id: 'custom-saas',
        title: 'Sistemas Web & Plataformas SaaS Sob Medida',
        description:
          'Aplicações robustas com frontend em React/TypeScript, APIs tipadas via OpenAPI e segurança em nível de banco com Supabase RLS.',
        deliverables: ['Arquitetura Multi-Tenant', 'Autenticação JWT & RLS', 'Painéis Executivos em Tempo Real'],
        metricBadge: '99.9% Uptime',
      },
    ] as ServiceItem[],
  },
  portfolio: {
    sectionBadge: 'Resultados Comprovados',
    title: 'Cases de Sucesso e Impacto em Negócios',
    subtitle:
      'Conheça os sistemas que construímos e as métricas reais de eficiência e receita geradas para nossos parceiros.',
    emptyState: 'Nenhum projeto publicado no momento.',
    errorState: 'Não foi possível carregar os projetos agora. Tente novamente em instantes.',
    loadingAriaLabel: 'Carregando projetos do portfólio',
    techStackAriaLabel: 'Tecnologias utilizadas',
    liveProjectLabel: 'Ver projeto em produção',
  },
  leadForm: {
    sectionBadge: 'Diagnóstico Comercial',
    title: 'Pronto para escalar sua infraestrutura digital?',
    subtitle:
      'Preencha os dados abaixo para qualificação técnica. Nosso time retornará em até 24 horas úteis com um plano de ação.',
    labels: {
      name: 'Nome Completo',
      email: 'E-mail Corporativo',
      whatsapp: 'WhatsApp com DDD',
      projectType: 'Tipo de Projeto',
      budget: 'Investimento Estimado',
      details: 'Contexto e Objetivos do Projeto (Opcional)',
    },
    placeholders: {
      name: 'Ex: Roberto Almeida',
      email: 'voce@suaempresa.com.br',
      whatsapp: '(11) 99999-9999',
      projectType: 'Selecione a solução desejada',
      budget: 'Selecione a faixa de orçamento',
      details: 'Descreva brevemente o desafio atual, prazos ou integrações necessárias (máx. 500 caracteres)...',
    },
    submitLabel: 'Enviar Solicitação de Proposta',
    submittingLabel: 'Enviando dados...',
    successMessage: 'Recebemos suas informações! Um especialista entrará em contato via WhatsApp em breve.',
    errorToastTitle: 'Falha na comunicação com o servidor',
    errorToastDescription: 'Não foi possível processar sua solicitação agora (Erro 500). Tente novamente em instantes.',
  },
  footer: {
    navAriaLabel: 'Links do Rodapé',
    copyright: `© ${new Date().getFullYear()} TAF Digital. Todos os direitos reservados.`,
    complianceNote: 'Desenvolvido sob padrões estritos de Acessibilidade, Performance e Segurança de Dados.',
    links: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Portfólio', href: '#cases' },
      { label: 'Solicitar Proposta', href: '#contato' },
    ] as NavItem[],
  },
} as const;

