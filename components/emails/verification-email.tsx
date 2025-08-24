import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerificationEmailProps {
  userEmail: string;
  verificationUrl: string;
}

const VerificationEmail = ({ userEmail, verificationUrl }: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your account setup</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[580px] mx-auto">
            {/* Header */}
            <Section className="px-[40px] pt-[40px] pb-[20px]">
              <Heading className="text-[28px] font-bold text-gray-900 text-center m-0 mb-[8px]">
                Verify Your Email Address
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="px-[40px] pb-[20px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[32px]">
                This verification link will expire in 24 hours for security purposes.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button above doesn't work, you can copy and paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={verificationUrl} className="text-blue-600 underline">
                  {verificationUrl}
                </Link>
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If you didn't create an account with us, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="px-[40px] py-[20px] border-t border-gray-200">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent to <strong>{userEmail}</strong>
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                <Link href="#" className="text-gray-500 underline ml-[4px]">Unsubscribe</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;