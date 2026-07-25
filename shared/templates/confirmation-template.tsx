import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Heading,
  Preview,
  Tailwind,
  Text,
} from 'react-email';

interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

/**
 * Генерирует шаблон письма для подтверждения почты.
 * Ссылка для сброса формируется из домена и токена. Письмо информирует,
 * что ссылка действительна 1 час.
 *
 * @param props - Домен и токен для генерации ссылки.
 * @returns  Сгенерированный шаблон письма.
 */
export const ConfirmationTemplate = ({
  domain,
  token,
}: ConfirmationTemplateProps) => {
  const confirmLink = `${domain}/auth/email-confirmation?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body className="bg-[#f6f9fc] font-sans m-0 p-0 text-slate-900">
          <Container className="mx-auto my-10 max-w-[580px] bg-white p-8 rounded-lg border border-slate-200">
            <Heading className="text-2xl font-bold text-slate-800 m-0 mb-4">
              Verify Your Email
            </Heading>

            <Text className="text-base leading-6 text-slate-700 m-0 mb-6">
              Thank you for registering! Please confirm your email address by clicking
              the button below to activate your account:
            </Text>

            <Button
              href={confirmLink}
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
              Confirm Email
            </Button>

            <Text className="text-sm leading-5 text-slate-500 m-0 mb-4">
              This link is valid for 1 hour. If you did not create an account,
              you can safely ignore this email — no further action is required.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ConfirmationTemplate;