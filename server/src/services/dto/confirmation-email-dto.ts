import {type User} from "../../../../generated/prisma/client";

export interface ConfirmationEmailDto {
  token: string;
}

export interface ILoginResponse {
  user: User | null;
  twoFactorRequired?: boolean;
}