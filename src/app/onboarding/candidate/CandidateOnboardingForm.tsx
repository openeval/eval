"use client";

import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
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
import { Label } from "~/components/ui/Label";
import { type Prisma } from "@prisma/client";
import { z } from "zod";
type CandidateOnboardingFormProps = {
  onSuccess: () => void;
  className?: string;
};

const candidateSchema = z.object({
  name: z.string(),
  lastName: z.string(),
});

type FormData = z.infer<typeof candidateSchema>;

export function CandidateOnboardingForm({
  className,
  ...props
}: CandidateOnboardingFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(candidateSchema),
    // values: { type: "candidate" },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    props.onSuccess();
    // // Mutate external data source
    // const response = await fetch(`/api/org`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (response.ok) {
    //   // This forces a cache invalidation.
    //   router.refresh();

    //   router.push("/assessments");
    // } else {
    //   toast({
    //     title: "Something went wrong.",
    //     description: "Your request failed. Please try again.",
    //     variant: "destructive",
    //   });
    // }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>My profile</CardTitle>
            <CardDescription>what is your main profession</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
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
                  <FormLabel> Name</FormLabel>
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
            <Button className="w-full" isLoading={isLoading}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
