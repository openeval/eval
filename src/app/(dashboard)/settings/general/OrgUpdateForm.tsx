"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Organization } from "@prisma/client";
import { OrganizationUpdateInputSchema } from "prisma/zod";
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

type OrgUpdateFormProps = React.HTMLAttributes<HTMLFormElement> & {
  defaultValues: Organization;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
};

const schema = OrganizationUpdateInputSchema;

type FormData = z.infer<typeof schema>;

export function OrgUpdateForm({
  defaultValues,
  isLoading,
  onSubmit,
}: OrgUpdateFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

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
