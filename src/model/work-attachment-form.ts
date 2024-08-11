import { z } from "zod";
import { BaseFormCreateSchema } from "./form/create";
import { WorkAttachmentModel } from "./work-attachment-model";
import { BaseFormUpdateSchema } from "./form/update";

export const WorkAttachmentFormSchema = WorkAttachmentModel;
export type IWorkAttachmentFormSchema = z.infer<typeof WorkAttachmentFormSchema>;

export const CreateWorkAttachmentSchema = BaseFormCreateSchema.merge(WorkAttachmentModel);
export type ICreateWorkAttachmentSchema = z.infer<typeof CreateWorkAttachmentSchema>;

export const UpdateWorkAttachmentSchema = BaseFormUpdateSchema.merge(WorkAttachmentModel);
export type IUpdateWorkAttachmentSchema = z.infer<typeof UpdateWorkAttachmentSchema>;
