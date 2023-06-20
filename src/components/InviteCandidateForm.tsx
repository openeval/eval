"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Card } from "~/components/ui/Card";

interface InviteCandidateFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assessmentId: string;
  onSuccess: Function;
}

const invitationSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

type FormData = z.infer<typeof invitationSchema>;

export function InviteCandidateForm({
  assessmentId,
  className,
  onSuccess,
  ...props
}: InviteCandidateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(invitationSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onHandleSubmit(data: FormData) {
    setIsLoading(true);

    const response = await fetch(`/api/candidates/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assessmentId, ...data }),
    });

    setIsLoading(false);

    if (response.ok) {
      onSuccess && onSuccess();
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className={cn("mt-8 grid gap-6", className)}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Card>
          <Card.Header>
            <Card.Title>Invite</Card.Title>
          </Card.Header>
          <Card.Content className="grid gap-4">
            <div className="grid gap-1">
              <Label className="" htmlFor="name">
                Name
              </Label>
              <Input id="name" {...register("name")} />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="" htmlFor="name">
                Last name
              </Label>
              <Input id="lastName" {...register("lastName")} />
              {errors?.lastName && (
                <p className="px-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input id="email" {...register("email")} />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" isLoading={isLoading}>
              Invite
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
}
