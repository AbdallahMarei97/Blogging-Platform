"use client";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createComment } from "@/actions/comment";
import { useTransition } from "react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  message: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export function CreateComment({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      form.reset();
      const comment = await createComment(postId, values.message);
      if ("error" in comment) {
        toast("Failed to create comment");
      } else {
        toast("Comment created successfully");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your comment here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Create Comment
        </Button>
      </form>
    </Form>
  );
}
