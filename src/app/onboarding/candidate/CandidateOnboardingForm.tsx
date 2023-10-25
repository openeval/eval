"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateCreateInputSchema } from "prisma/zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import { toast } from "~/hooks/use-toast";
import type { CreateCandidateAction } from "../actions";

type CandidateOnboardingFormProps = {
  onSuccess: () => void;
  action: CreateCandidateAction;
};

const candidateSchema = CandidateCreateInputSchema;

type FormData = z.infer<typeof candidateSchema>;

export function CandidateOnboardingForm({
  ...props
}: CandidateOnboardingFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(candidateSchema),
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      try {
        await props.action(data);
        props.onSuccess();
      } catch (e) {
        // TODO: how to handle errors in with server actions
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
        <Card>
          <CardHeader>
            <CardTitle>My profile</CardTitle>
            <CardDescription>tell us about you</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jonh" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doeh" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLoading}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
