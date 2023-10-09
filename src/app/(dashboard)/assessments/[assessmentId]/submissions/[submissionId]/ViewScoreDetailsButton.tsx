"use client";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/Sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Checkbox } from "~/components/ui/Checkbox";
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import type { Submission } from "@prisma/client";

type EvaluationCriteriaWithChildren = Prisma.EvaluationCriteriaGetPayload<{
  include: { children: true };
}>;

type ViewScoreDetailsButtonProps = {
  submission: Partial<Submission>;
  evaluationCriterias: EvaluationCriteriaWithChildren[];
};

export function ViewScoreDetailsButton({
  review,
  evaluationCriterias,
}: ViewScoreDetailsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <span className="mx-auto text-xs text-muted-foreground">
            view more
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent position="right">
        <Card>
          <CardHeader>
            <CardTitle>Review</CardTitle>
            <CardDescription>Candidate performance details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="space-y-4">
              {evaluationCriterias.map((item) => {
                return (
                  <div>
                    <div className="mb-4 flex">
                      <span className="text-base">{item.name}</span>
                    </div>
                    <div className="space-y-2">
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <Checkbox
                            checked={review.evaluationCriterias
                              .map((item) => item.id)
                              .includes(child.id)}
                            disabled
                          />

                          <span className="font-normal">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}

        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
