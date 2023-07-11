"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Github } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { signIn } from "next-auth/react";

export function ConnectGithubAccount() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect your Github account</CardTitle>
      </CardHeader>
      <CardContent>
        {" "}
        we use Github to track and follow your assessments progress we only read
        information from your contributions to public repositories.
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => {
            // setIsGitHubLoading(true);
            void signIn("github", {
              redirect: false,
              callbackUrl: "/onboarding/candidate?step=success",
            });
          }}
        >
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>

        <Button variant="ghost">Skip</Button>
      </CardFooter>
    </Card>
  );
}
