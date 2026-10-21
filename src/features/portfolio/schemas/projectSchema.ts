import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  tech_stack: z.array(z.string()).nonempty(),
  metric_highlight: z.string().min(1),
  image_url: z.string().url(),
  live_url: z.string().url().nullable().optional(),
  created_at: z.string().min(1),
});

export const projectListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;

