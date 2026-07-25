import React from "react";
import {
  Body,
  Heading,
  Tailwind,
  Text,
  Button,
  Container,
  Head,
  Preview,
  Html
} from 'react-email';

interface ResetPasswordTemplateProps {
  domain: string;
  token: string;
}

/**
 * Генерирует шаблон письма для сброса пароля.
 * Ссылка для сброса формируется из домена и токена. Письмо информирует,
 * что ссылка действительна 1 час.
 *
 * @param props - Домен и токен для генерации ссылки.
 * @returns  Сгенерированный шаблон письма.
 */
export function ResetPasswordTemplate({
  domain,
  token
}: ResetPasswordTemplateProps) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Reset your password</Preview>
        <Body className="bg-[#f6f9fc] font-sans m-0 p-0 text-slate-900">
          <Container className="mx-auto my-10 max-w-[580px] bg-white p-8 rounded-lg border border-slate-200">
            <Heading className="text-2xl font-bold text-slate-800 m-0 mb-4">
              Reset your password
            </Heading>

            <Text className="text-base leading-6 text-slate-700 m-0 mb-6">
              Hi! You requested a password reset. Please follow the link below to create a new password:
            </Text>

            <Button
              href={resetLink}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'inline-block',
              }}
              className="m-0 mb-6"
            >
              Reset password
            </Button>

            <Text className="text-sm leading-5 text-slate-500 m-0 mb-4">
              This link is valid for 1 hour. If you did not reset password an account,
              you can safely ignore this email — no further action is required.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ResetPasswordTemplate;