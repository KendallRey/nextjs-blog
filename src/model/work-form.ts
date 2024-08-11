import { z } from "zod";
import { BaseFormCreateSchema } from "./form/create";
import { WorkModel } from "./work-model";
import { BaseFormUpdateSchema } from "./form/update";

export const WorFormSchema = WorkModel;
export type IWorFormSchema = z.infer<typeof WorFormSchema>;

export const CreateWorkSchema = BaseFormCreateSchema.merge(WorkModel);
export type ICreateWorSchema = z.infer<typeof CreateWorkSchema>;

export const UpdateWorkSchema = BaseFormUpdateSchema.merge(WorkModel);
export type IUpdateWorkSchema = z.infer<typeof UpdateWorkSchema>;
