"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type Prisma from "@prisma/client";
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
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { z } from "zod";
type CandidateFormProps = {
  onSuccess: () => void;
  action: (data: Partial<Prisma.Candidate>) => Promise<unknown>;
};

const candidateSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().min(1).email("This is not a valid email."),
});

type FormData = z.infer<typeof candidateSchema>;

export function CandidateForm({ ...props }: CandidateFormProps) {
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
            <CardTitle>Profile</CardTitle>
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
                  <FormDescription>The public display name.</FormDescription>
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
                  <FormDescription>The public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jonh.doeh@..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The email to contact the candidate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end bg-slate-100 p-4">
            <Button disabled={isLoading}>save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
