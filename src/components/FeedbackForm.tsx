"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendFeedbackAction } from "~/actions/feedback";
import { Button } from "~/components/ui/Button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/Form";
import { Textarea } from "~/components/ui/Textarea";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/Separator";

const invitationSchema = z.object({
  message: z.string().min(1),
});

type FormData = z.infer<typeof invitationSchema>;

export function FeedbackForm({ onSuccess }) {
  const form = useForm<FormData>({
    resolver: zodResolver(invitationSchema),
  });
  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      const res = await sendFeedbackAction(data);
      if (res.success) {
        toast({
          title: "Success.",
          description: "Thank you for your feedback",
        });
        onSuccess();
      } else {
        toast({
          title: "Something went wrong.",
          description: res.error?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className={cn("")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <Textarea placeholder="I would like..." {...field} />
                <FormDescription>
                  Any new idea of suggestion to improve
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <div className="flex">
            <Button type="submit" disabled={isLoading} className="ml-auto">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
