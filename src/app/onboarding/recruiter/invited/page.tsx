import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { getCurrentUser } from "~/server/auth";
import * as MembershipService from "~/server/services/Membership";
import { update as updateUser } from "~/server/services/User";

export const metadata = {
  title: "Onboarding",
};

//we get callback,  can we pass params ?
export default async function CandidateInvited({ searchParams }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { membershipId } = searchParams;

  const membership = await MembershipService.findOneById(membershipId);

  if (!membership) {
    notFound();
  }

  if (membership.userId === user.id && !membership.accepted) {
    await MembershipService.update({ id: membershipId }, { accepted: true });
    //set active org
    await updateUser(
      { id: user.id },
      { activeOrg: { connect: { id: membership.organizationId } } },
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Congratulations</CardTitle>
        </CardHeader>
        <CardContent>You have joined the Team !</CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/assessments">Continue</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
