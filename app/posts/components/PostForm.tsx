"use client";
import UploadPage from "@/app/upload/page";
import { postSchema } from "@/app/validationSchema";
import { Post } from "@prisma/client";
import { Button, Callout, Flex, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
}); // tip: lazy loading

const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  type Post = z.infer<typeof postSchema>;

  const [newPost, setNewPost] = useState<Post>({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (imageUrl) {
      setNewPost({ ...newPost, image: imageUrl });
    }
  }, [imageUrl]);

  useEffect(() => {
    console.log(newPost);
  }, [newPost]);

  const handlePost = async () => {
    try {
      setIsSubmitting(true);
      if (post) await axios.patch(`/api/posts/${post.id}`, newPost);
      else await axios.post("/api/posts", newPost);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError("An error ocurred");
    }
  };

  return (
    <div className="max-w-xl space-y-3 p-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Flex className="space-y-3" direction={"column"}>
        <TextField.Root
          variant="surface"
          placeholder="Title"
          defaultValue={post?.title}
          value={newPost.title}
          onChange={(event) =>
            setNewPost({ ...newPost, title: event.target.value })
          }
        />
        <UploadPage handleUpload={setImageUrl} />
        <SimpleMDE
          placeholder="Description..."
          value={newPost.description}
          onChange={(value) => setNewPost({ ...newPost, description: value })}
        />
        <Button disabled={isSubmitting} onClick={handlePost}>
          {post ? "Update Post" : "Submit New Post"}
          {isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </div>
  );
};

export default PostForm;
