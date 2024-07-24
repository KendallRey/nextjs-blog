import { z } from "zod";

// For Delete
export const BaseFormDeleteSchema = z.object({
  created_at: z.object({}).optional(),
  updated_at: z.object({}).optional(),
  deleted_at: z.object({}),
  archived: z.boolean(),
});
export type IBaseFormDeleteSchema = z.infer<typeof BaseFormDeleteSchema>;
