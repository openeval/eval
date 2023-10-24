"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { OrganizationCreateInputSchema } from "prisma/zod";
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
import { type CreateOrgAction } from "../actions";

type CreateOrganizationFormProps = React.HTMLAttributes<HTMLDivElement> & {
  action: CreateOrgAction;
};

const orgSchema = OrganizationCreateInputSchema.pick({ name: true });

type FormData = z.infer<typeof orgSchema>;

export function CreateOrganizationForm({
  ...props
}: CreateOrganizationFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(orgSchema),
  });
  const router = useRouter();
  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await props.action(data);
      if (res.success) {
        toast({
          title: "Success!",
          description: "Organization created",
        });
        router.push("/");
      } else {
        console.log(res.error);
        toast({
          title: "Something went wrong.",
          description: res.error.message,
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
