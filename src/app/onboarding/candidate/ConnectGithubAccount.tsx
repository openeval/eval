"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/Button";
import { env } from "~/env.mjs";

import { cn } from "~/lib/utils";

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
      <CardFooter>
        <Link
          href={`https://github.com/login/oauth/authorize?client_id=${env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID}`}
          passHref
        >
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Github className="mr-2 h-4 w-4" />
            Github
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
