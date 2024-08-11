import { z } from "zod";
import { BaseSchema } from "./base/base";
import { stringRequired } from "./base/data";

export const WORK_ATTACHMENT_TYPE = {
  VIDEO: "video",
  MODEL: "model",
  IMAGE: "image",
} as const;
export type IWorkAttachmentType = (typeof WORK_ATTACHMENT_TYPE)[keyof typeof WORK_ATTACHMENT_TYPE];

export const WorkAttachmentModel = BaseSchema.merge(
  z.object({
    type: z.enum([WORK_ATTACHMENT_TYPE.IMAGE, WORK_ATTACHMENT_TYPE.MODEL, WORK_ATTACHMENT_TYPE.VIDEO]),
    link: stringRequired,
  }),
);
export type IWorkAttachmentModel = z.infer<typeof WorkAttachmentModel>;
