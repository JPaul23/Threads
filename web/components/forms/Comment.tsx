"use client";

import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// import { updateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.action";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: ""
      },
    });
  
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
      form.reset();
  
    };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 items-center">
              <FormLabel>
                <Image 
                src={currentUserImg} 
                alt="Profile image" height={48} width={48} 
                className="object-cover rounded-full"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input type="text" placeholder="Comment..." className="text-light-1 no-focus outline-none"/>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
