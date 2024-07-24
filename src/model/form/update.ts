import { z } from "zod";

// For Update
export const BaseFormUpdateSchema = z.object({
  id: z.string().optional(),
  created_at: z.object({}).or(z.string()).optional(),
  updated_at: z.object({}).or(z.string()),
  deleted_at: z.object({}).or(z.string()).optional(),
  archived: z.boolean().optional(),
});
export type IBaseFormUpdateSchema = z.infer<typeof BaseFormUpdateSchema>;
