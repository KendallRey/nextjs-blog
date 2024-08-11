import { z } from "zod";
import { BaseFormCreateSchema } from "./form/create";
import { WorkModel } from "./work-model";
import { BaseFormUpdateSchema } from "./form/update";

export const WorFormSchema = WorkModel;
export type IWorFormSchema = z.infer<typeof WorFormSchema>;

export const CreateWorSchema = BaseFormCreateSchema.merge(WorkModel);
export type ICreateWorSchema = z.infer<typeof CreateWorSchema>;

export const UpdateWorSchema = BaseFormUpdateSchema.merge(WorkModel);
export type IUpdateWorSchema = z.infer<typeof UpdateWorSchema>;
