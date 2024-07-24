import { z } from "zod";

// For Create
export const BaseFormCreateSchema = z.object({
  // not required
  id: z.undefined(),
  created_at: z.object({}),
  updated_at: z.object({}),
  deleted_at: z.object({}).nullable(),
  archived: z.boolean(),
});
export type IBaseFormCreateSchema = z.infer<typeof BaseFormCreateSchema>;
