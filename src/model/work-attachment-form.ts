import { z } from "zod";
import { BaseFormCreateSchema } from "./form/create";
import { WorkAttachmentModel } from "./work-attachment-model";

export const WorkAttachmentFormSchema = BaseFormCreateSchema.merge(WorkAttachmentModel);
export type IWorkAttachmentFormSchema = z.infer<typeof WorkAttachmentFormSchema>;

export const CreateWorkAttachmentSchema = WorkAttachmentFormSchema;
export type ICreateWorkAttachmentSchema = z.infer<typeof CreateWorkAttachmentSchema>;

export const UpdateWorkAttachmentSchema = WorkAttachmentFormSchema;
export type IUpdateWorkAttachmentSchema = z.infer<typeof UpdateWorkAttachmentSchema>;
