import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

import { siteConfig } from "~/config/site";
import { absoluteUrl } from "~/lib/utils";
import config from "./tailwind.config.cjs";

interface LoginEmailProps {
  url: string;
}

export const LoginEmail = ({ url }: LoginEmailProps) => {
  const previewText = `Sign in to ${siteConfig.name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      {/* https://gist.github.com/lordelogos/f2146ec1769510afc769a1b0d1ba0363 */}
      <Tailwind config={config}>
        <Body className="m-auto bg-background font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-8">
            <Section className="mt-[32px]">
              <Img
                src={`${absoluteUrl()}/icon.png`}
                width="40"
                height="40"
                alt={siteConfig.name}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal ">
              Sign in
            </Heading>

            <Text className="text-[14px] leading-[24px]">
              Click the button below to sign in on {siteConfig.name}:
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-primary px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Sign in
              </Button>
            </Section>
            <Text className="break-normal text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="w-[465px] text-wrap break-words rounded-sm bg-gray-100 p-4">
              <Link
                href={url}
                id="magic-link"
                className="text-primary no-underline"
              >
                {url}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you did not request this email you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;
