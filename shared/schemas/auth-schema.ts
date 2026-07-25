import {z} from "zod";
import {Language, Theme} from "@/generated/prisma/enums.ts";

export const emailSchema = z
  .string()
  .min(1, {message: 'Email is required'})
  .email({message: 'Invalid email format'});

export const passwordSchema = z
  .string()
  .min(6, {message: 'Password must be at least 6 characters'});

export const nameSchema = z
  .string()
  .min(2, {message: 'Name must be at least 2 characters'});

// export const twoFactorCodeSchema = z
//   .string()
//   .length(6, 'The code must consist of 6 digits.')

export const formLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 6, {
      message: "Code must be exactly 6 characters",
    }),
});

export const formRegisterSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(6, {message: 'Confirm password is required'})
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const formForgotPasswordSchema = z.object({
  email: emailSchema
});

export const formResetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(6, {message: 'Confirm password is required'})
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const formDeleteAccountSchema = z.object({
  password: passwordSchema
});

export const formUpdateSettingsSchema = z.object({
  theme: z.nativeEnum(Theme, {
    message: 'Invalid theme selected'
  }),
  language: z.nativeEnum(Language, {
    message: 'Invalid language selected'
  }),
  emailNotifications: z.boolean({
    message: 'Email notifications status must be a boolean'
  }),
}).partial();

// auth
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormForgotPasswordValues = z.infer<typeof formForgotPasswordSchema>;
export type TFormResetPasswordValues = z.infer<typeof formResetPasswordSchema>;

// user
export type TFormDeleteAccountValues = z.infer<typeof formDeleteAccountSchema>;
export type TFormUpdateSettingsValues = z.infer<typeof formUpdateSettingsSchema>;