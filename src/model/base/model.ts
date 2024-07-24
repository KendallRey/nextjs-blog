import { z } from "zod";

/**
 * Base Model of all database model.
 * @remarks
 * Do not remove the `id`❗
 */
export const ModelSchema = z.object({
  id: z.string(),
});
export type IModel = z.infer<typeof ModelSchema>;
