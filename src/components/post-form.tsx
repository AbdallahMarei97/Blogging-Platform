"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  body: z.string().min(6, {
    message: "Body must be at least 6 characters.",
  }),
  imagePath: z
    .string()
    .min(6, {
      message: "Image path must be a valid link.",
    })
    .refine(
      (value) => {
        if (value.startsWith("http") || value.startsWith("https")) {
          return true;
        } else {
          return false;
        }
      },
      {
        message: "Image path must be a valid link.",
        path: ["imagePath"],
      }
    ),
});

export type FormValues = z.infer<typeof formSchema>;

export function PostForm({
  title,
  buttonText,
  onSubmit,
  dialogTrigger,
  defaultValues,
}: {
  title: string;
  buttonText: string;
  dialogTrigger: React.ReactNode;
  defaultValues?: {
    title: string;
    body: string;
    imagePath: string;
  };
  onSubmit: (data: FormValues) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const valuesObject = {
    title: defaultValues?.title || "",
    body: defaultValues?.body || "",
    imagePath: defaultValues?.imagePath || "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: valuesObject,
    values: valuesObject,
  });

  const submitHandler = async (FormValues: FormValues) => {
    setIsLoading(true);
    await onSubmit(FormValues);
    setIsLoading(false);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your post here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagePath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer"
            >
              {buttonText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
