"use client";
import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Label } from "~/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/RadioGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/Form";
import { UserType } from "@prisma/client";

const userTypeSchema = z.object({
  type: z.string(),
});

type FormData = z.infer<typeof userTypeSchema>;

type UserTypeFormProps = {
  action: (data) => Promise<unknown>;
};

export function UserTypeForm({ action }: UserTypeFormProps) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(userTypeSchema),
    defaultValues: {
      type: UserType.CANDIDATE,
    },
    // values: { type: "candidate" },
  });

  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      try {
        toast({
          title: "Success.",
          description: "account updated",
        });

        await action(data);
        router.push(`/onboarding/${data.type.toLowerCase()}`);

        // router go to next step "tasks", i need the id :)
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
                        >
                          <RadioGroupItem
                            value={UserType.CANDIDATE}
                            id="candidate"
                            className="sr-only"
                          />
                          I&apos;m a Candidate
                        </Label>
                        <Label
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
            <Button className="w-full" disabled={isLoading}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
