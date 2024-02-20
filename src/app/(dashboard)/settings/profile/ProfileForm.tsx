"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { UserSchema } from "prisma/zod";
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
import { ProfileDtoSchema, type ProfileDto } from "~/dto/ProfileDto";
import { toast } from "~/hooks/use-toast";
import { updateProfileAction } from "./actions";

type ProfileFormProps = React.HTMLAttributes<HTMLFormElement> & {
  defaultValues: ProfileDto; // ProfileDto
  onSuccess?: () => void;
};

const schema = ProfileDtoSchema;

type FormData = z.infer<typeof schema>;

export function ProfileForm({ defaultValues, onSuccess }: ProfileFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    shouldUnregister: true,
  });

  const [isLoadingAction, startActionTransition] = React.useTransition();

  const onSubmit = (formData: FormData) => {
    startActionTransition(async () => {
      const res = await updateProfileAction(defaultValues.id, formData);

      if (res.success) {
        toast({
          title: "Updated.",
        });
        onSuccess?.();
      } else {
        toast({
          title: "Something went wrong.",
          description: res.error?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>Manage settings for your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      {...field}
                      value={field.value as string}
                    />
                  </FormControl>
                  <FormDescription>How should we call you.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled
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
                  <FormDescription>The email to contact you.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button disabled={isLoadingAction}>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
