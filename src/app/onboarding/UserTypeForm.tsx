"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { UserUpdateInputSchema } from "prisma/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/Form";
import { Label } from "~/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/RadioGroup";
import { toast } from "~/hooks/use-toast";
import { type UpdateUserTypeAction } from "./actions";

const userTypeSchema = UserUpdateInputSchema.pick({ type: true });

type FormData = z.infer<typeof userTypeSchema>;

type UserTypeFormProps = {
  action: UpdateUserTypeAction;
};

export function UserTypeForm({ action }: UserTypeFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userTypeSchema),
    defaultValues: {
      type: UserType.CANDIDATE,
    },
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await action(data);
      if (res.success) {
        toast({
          title: "Success.",
          description: "account updated",
        });
        redirect(`/onboarding/${data.type.toLowerCase()}`);
      } else {
        toast({
          title: "Something went wrong.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>User role</CardTitle>
            <CardDescription>what is your main rol?</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        <Label
                          htmlFor="candidate"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          data-testid="candidate"
                        >
                          <RadioGroupItem
                            value={UserType.CANDIDATE}
                            id="candidate"
                            className="sr-only"
                          />
                          I&apos;m a Candidate
                        </Label>
                        <Label
                          data-testid="recruiter"
                          htmlFor="recruiter"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem
                            value={UserType.RECRUITER}
                            id="recruiter"
                            className="sr-only"
                          />
                          I&apos;m a Recruiter
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              data-testid="confirmation-button"
              disabled={isLoading}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
