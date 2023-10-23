"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { OrganizationCreateInputSchema } from "prisma/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";

type CandidateOnboardingFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = Prisma.OrganizationCreateInput;

export function CandidateOnboardingForm({
  className,
  ...props
}: CandidateOnboardingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(OrganizationCreateInputSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(data: FormData) {
    setIsLoading(true);

    // Mutate external data source
    const response = await fetch(`/api/org`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // This forces a cache invalidation.
      router.refresh();

      router.push("/assessments");
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your request failed. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Name
            </Label>
            <Input id="name" {...register("name")} />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="lastName">
              Last name
            </Label>
            <Input id="name" {...register("lastName")} />
            {errors?.lastName && (
              <p className="px-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <Button disabled={isLoading}>Next</Button>
        </div>
      </form>
    </div>
  );
}
