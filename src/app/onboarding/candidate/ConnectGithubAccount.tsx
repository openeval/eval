"use client";

import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";

export function ConnectGithubAccount() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  console.log(callbackUrl);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect your Github account</CardTitle>
      </CardHeader>
      <CardContent>
        {" "}
        We use Github to track and follow your assessments progress. We only
        read information from your contributions to public repositories.
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => {
            void signIn("github", {
              redirect: false,
              callbackUrl: callbackUrl || "/onboarding/candidate?step=success",
            });
          }}
        >
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
        {/* <Button asChild className="w-full" variant="ghost">
          <Link href={callbackUrl || "/onboarding/candidate?step=success"}>
            Skip
          </Link>
        </Button> */}
      </CardFooter>
    </Card>
  );
}
