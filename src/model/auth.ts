import { z } from "zod";

export const AuthTokenSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  id: z.number(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
});

export const RefreshTokenSchema = z.object({
  access: z.string(),
});
