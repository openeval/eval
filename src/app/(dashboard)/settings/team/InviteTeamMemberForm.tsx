import { zodResolver } from "@hookform/resolvers/zod";
import { MembershipRole } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/Button";
import {
  Card,
  CardContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { roleList } from "~/config/security";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { inviteTeamMemberAction } from "./actions";

interface InviteTeamMemberFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess: () => void;
}

const invitationSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(MembershipRole),
  email: z.string().email(),
});

type FormData = z.infer<typeof invitationSchema>;

export function InviteTeamMemberForm({
  className,
  onSuccess,
}: InviteTeamMemberFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(invitationSchema),
  });
  const [isLoading, startActionTransition] = React.useTransition();

  async function onSubmit(data: FormData) {
    startActionTransition(async () => {
      try {
        const res = await inviteTeamMemberAction(data);
        if (res.success) {
          onSuccess();
        } else {
          toast({
            title: "Something went wrong.",
            description: res.error?.message,
            variant: "destructive",
          });
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
    <div className={cn("mt-8 grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Invite</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jonh" {...field} />
                    </FormControl>
                    <FormDescription>Optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="md:max-w-md">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleList.map(({ name, value }, key) => (
                          <SelectItem key={key} value={value}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The role for the new team member
                    </FormDescription>
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

                    <Input placeholder="team@..." {...field} />
                    <FormDescription>
                      The email of the new team member
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" disabled={isLoading}>
                Invite
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
