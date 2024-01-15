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

interface TeamMateInvitationEmailProps {
  username?: string;
  teamName?: string;
  inviteLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "";

export const TeamMateInvitationEmail = ({
  username = "zenorocha",
  teamName = "My Project",
  inviteLink = "https://vercel.com/teams/invite/foo",
}: TeamMateInvitationEmailProps) => {
  const previewText = `Join ${teamName} on Eval`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      {/* https://gist.github.com/lordelogos/f2146ec1769510afc769a1b0d1ba0363 */}
      <Tailwind>
        <Body className="m-auto bg-background font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/icon.png`}
                width="40"
                height="37"
                alt="Eval"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{teamName}</strong> on <strong>Eval</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You have a new invitation to join <strong>{teamName}</strong> on{" "}
              <strong>Eval</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-background  p-4 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-primary no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TeamMateInvitationEmail;
