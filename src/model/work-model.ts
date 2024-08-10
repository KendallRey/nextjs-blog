import { z } from "zod";
import { BaseSchema } from "./base/base";
import { stringOptional, stringRequired } from "./base/data";

export const WorkModel = BaseSchema.merge(
  z.object({
    title: stringRequired,
    post_date: stringOptional,
    description: stringRequired,
  }),
);
export type IWorkModel = z.infer<typeof WorkModel>;
