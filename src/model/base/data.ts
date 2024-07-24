import { z } from "zod";
import { ERROR } from "../constants/error";
import { MODEL, MONEY } from "@/components/constants/config";

export const stringOptional = z.string().nullable().optional();

export const stringRequired = z
  .string({ message: ERROR.FIELD.REQUIRED })
  .min(MODEL.STRING.LIMIT.MIN, ERROR.FIELD.REQUIRED)
  .max(MODEL.STRING.LIMIT.MAX, ERROR.FIELD.TOO_LONG);

export const numberRequired = z
  .number({ message: ERROR.FIELD.REQUIRED })
  .gte(MODEL.COUNT.LIMIT.MIN, ERROR.FIELD.COUNT.MIN)
  .lte(MODEL.COUNT.LIMIT.MAX, ERROR.FIELD.COUNT.MAX);

export const moneyRequired = z
  .number({ message: ERROR.FIELD.REQUIRED })
  .gte(MONEY.LIMIT.MIN, ERROR.FIELD.MONEY.MIN)
  .lte(MONEY.LIMIT.MAX, ERROR.FIELD.MONEY.MAX);

export const moneyOptional = moneyRequired.optional();
