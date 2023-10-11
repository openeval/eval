import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
interface InviteCandidateFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  assessmentId: string;
  onSuccess: () => void;
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
}: InviteCandidateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(invitationSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onHandleSubmit(data: FormData) {
    setIsLoading(true);
    // TODO: move to server actions
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
          <CardHeader>
            <CardTitle>Invite</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
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
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              Invite
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
