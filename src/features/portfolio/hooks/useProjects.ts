import { useEffect, useState } from 'react';
import {
  projectListSchema,
  type Project,
} from '@/features/portfolio/schemas/projectSchema';

const MOCK_DELAY_MS = 2000;

// Dados simulados (substituídos pelo Supabase / API em ticket futuro).
const MOCK_PROJECTS: unknown = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Plataforma SaaS de Gestão Financeira B2B',
    description:
      'Automatização do fluxo de cobrança e conciliação, eliminando planilhas manuais e reduzindo o retrabalho operacional de equipes com mais de 50 analistas.',
    tech_stack: ['React', 'Supabase', 'Java'],
    metric_highlight: '+40% de conversão',
    image_url: 'https://picsum.photos/seed/taf-saas/1280/720',
    live_url: 'https://example.com/saas',
    created_at: '2026-08-12T14:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'E-commerce de Atacado com Preço Dinâmico por CNPJ',
    description:
      'Portal de pedidos recorrentes com tabelas de preço por cliente, checkout simplificado e integração com ERP legado.',
    tech_stack: ['React', 'TypeScript', 'Tailwind'],
    metric_highlight: '+35% de ticket médio',
    image_url: 'https://picsum.photos/seed/taf-ecommerce/1280/720',
    live_url: 'https://example.com/atacado',
    created_at: '2026-06-03T10:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Site Institucional de Alta Performance com Qualificação de Leads',
    description:
      'Redesenho completo focado em Core Web Vitals e funil de captação, com formulário de qualificação integrado ao CRM comercial.',
    tech_stack: ['Vite', 'React', 'Zod'],
    metric_highlight: 'Lighthouse 100',
    image_url: 'https://picsum.photos/seed/taf-site/1280/720',
    live_url: null,
    created_at: '2026-04-21T09:15:00Z',
  },
];

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

export const useProjects = (): UseProjectsResult => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const parsed = projectListSchema.safeParse(MOCK_PROJECTS);

      if (parsed.success) {
        setProjects(parsed.data);
      } else {
        console.error('[useProjects] Contrato inválido:', parsed.error.flatten());
        setError(parsed.error.message);
      }

      setIsLoading(false);
    }, MOCK_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  return { projects, isLoading, error };
};

