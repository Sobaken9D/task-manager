import React from 'react';
import {
  Body,
  Heading,
  Tailwind,
  Text,
  Container,
  Head,
  Preview,
  Html
} from 'react-email';

interface TwoFactorAuthTemplateProps {
  token: string;
}

/**
 * Генерирует шаблон письма для двухфакторной аутентификации.
 * Письмо содержит код, который необходимо ввести для завершения аутентификации.
 *
 * @param props - Токен для двухфакторной аутентификации.
 * @returns Сгенерированный шаблон письма.
 */
export function TwoFactorAuthTemplate({token}: TwoFactorAuthTemplateProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Two-factor authentication</Preview>
        <Body className="bg-[#f6f9fc] font-sans m-0 p-0 text-slate-900">
          <Container className="mx-auto my-10 max-w-[580px] bg-white p-8 rounded-lg border border-slate-200">
            <Heading className="text-2xl font-bold text-slate-800 m-0 mb-4">
              Two-factor authentication
            </Heading>

            <Text className="text-base leading-6 text-slate-700 m-0 mb-6">
              Your two-factor authentication code:
            </Text>

            <Text className="text-base leading-6 text-slate-700 m-0 mb-6 text-2xl">
              <strong>{token}</strong>
            </Text>

            <Text className="text-sm leading-5 text-slate-500 m-0 mb-4">
              This code is valid for 5 minutes. If you did not request this code,
              you can safely ignore this email — no further action is required.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default TwoFactorAuthTemplate;