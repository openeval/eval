"use client";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/Sheet";
import { BoxSelect, CheckSquare } from "lucide-react";

import type { Prisma } from "@prisma/client";

type EvaluationCriteriaWithChildren = Prisma.EvaluationCriteriaGetPayload<{
  include: { children: true };
}>;

type ReviewWithEC = Prisma.ReviewGetPayload<{
  include: { evaluationCriterias };
}>;

type ViewScoreDetailsButtonProps = {
  review: ReviewWithEC;
  evaluationCriterias: EvaluationCriteriaWithChildren[];
};

export function ViewScoreDetailsButton({
  review,
  evaluationCriterias,
}: ViewScoreDetailsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <span className="mx-auto text-xs text-muted-foreground">
            view details
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="lg:max-w-screen-lg">
        <SheetHeader className="mb-8">
          <SheetTitle>Score details</SheetTitle>
          <SheetDescription>Candidate performance review</SheetDescription>
        </SheetHeader>

        <div className="grid gap-6">
          <div className="space-y-4">
            {evaluationCriterias.map((item) => {
              return (
                <div>
                  <div className="mb-4 flex">
                    <span className="text-base font-bold">{item.name}</span>
                  </div>
                  <div className="space-y-2">
                    {item.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        {review.evaluationCriterias
                          .map((item) => item.id)
                          .includes(child.id) ? (
                          <CheckSquare className="h-6 w-6 flex-none" />
                        ) : (
                          <BoxSelect className="h-6 w-6 flex-none" />
                        )}

                        <span className="font-normal">{child.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
