"use client";
import { ErrorMessage } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";

type IssueDataForm = z.infer<typeof issueSchema>;
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
}); // tip: lazy loading

const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueDataForm>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (post) await axios.patch(`/api/issues/${post.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError("An error ocurred");
    }
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          variant="surface"
          placeholder="Title"
          {...register("title")}
          defaultValue={post?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={post?.description}
          render={({ field }) => (
            <>
              <SimpleMDE placeholder="Description..." {...field} />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </>
          )}
        />

        <Button disabled={isSubmitting}>
          {post ? "Update Post" : "Submit New Post"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
