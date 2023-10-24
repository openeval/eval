"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type Prisma from "@prisma/client";
import type { Organization } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

type OrgUpdateFormProps = React.HTMLAttributes<HTMLDivElement> & {
  org: Partial<Organization>;
  onSuccess?: () => void;
  action: (id: string, data: Partial<Prisma.Candidate>) => Promise<unknown>;
};

const orgSchema = z.object({
  name: z.string(),
});

type FormData = z.infer<typeof orgSchema>;

export function OrgUpdateForm({ org, ...props }: OrgUpdateFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(orgSchema),
    defaultValues: org,
  });
  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      try {
        await props.action(org.id as string, data);
        if (typeof props?.onSuccess === "function") {
          props.onSuccess();
        }
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
            <CardTitle>My Organization</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button disabled={isLoading}>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
