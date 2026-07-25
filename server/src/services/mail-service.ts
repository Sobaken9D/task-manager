import type {Transporter} from "nodemailer";
import nodemailer from "nodemailer";
import {render} from '@react-email/components';
import {
  ConfirmationTemplate,
  ResetPasswordTemplate,
  TwoFactorAuthTemplate
} from "@/shared/templates";
import {InternalServerError} from "../../../shared/utils/errors";


class MailService {
  private transporter: Transporter;

  constructor() {
    const port = Number(process.env.MAIL_PORT);

    // Настройка SMTP-клиента с данными из .env
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  /**
   * Отправляет email-сообщение.
   * @param email - Адрес электронной почты получателя.
   * @param subject - Тема email-сообщения.
   * @param html - HTML-содержимое email-сообщения.
   * @returns Промис, который разрешается при успешной отправке.
   */
  private async sendMail(email: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: subject,
        html: html
      });
    } catch (error) {
      console.error(`[SMTP_MAIL_ERROR] to address ${email}:`, error);
      throw new InternalServerError('Failed to send email message via SMTP');
    }
  }

  /**
   * Отправляет на email шаблон для подтверждения почты.
   * @param email - Адрес электронной почты получателя.
   * @param token - Токен подтверждения.
   * @returns Промис, который разрешается при успешной отправке.
   */
  public async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const domain = process.env.ALLOWED_ORIGIN!;
    const html = await render(ConfirmationTemplate({domain, token}));

    await this.sendMail(email, 'Email verification', html);
  }

  /**
   * Отправляет на email шаблон для сброса пароля.
   * @param email - Адрес электронной почты получателя.
   * @param token - Токен для сброса пароля.
   * @returns Промис, который разрешается при успешной отправке.
   */
  public async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const domain = process.env.ALLOWED_ORIGIN!;
    const html = await render(ResetPasswordTemplate({domain, token}));

    await this.sendMail(email, 'Password reset', html);
  }

  /**
   * Отправляет на email шаблон с токеном двухфакторной аутентификации.
   * @param email - Адрес электронной почты получателя.
   * @param token - Токен двухфакторной аутентификации.
   * @returns Промис, который разрешается при успешной отправке.
   */
  public async sendTwoFactorTokenEmail(email: string, token: string): Promise<void> {
    const html = await render(TwoFactorAuthTemplate({token}));

    await this.sendMail(email, 'Verification of your identity', html);
  }
}

export const mailService = new MailService();