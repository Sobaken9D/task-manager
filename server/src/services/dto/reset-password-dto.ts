import type {
  TFormForgotPasswordValues,
  TFormResetPasswordValues
} from "@/shared/schemas/auth-schema.ts";

export type ForgotPasswordDto = TFormForgotPasswordValues;

export type ResetPasswordDto = TFormResetPasswordValues;