import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const NewPostBtn = () => {
  return (
    <Button>
      <Link href={"/posts/new"}>Create Post</Link>
    </Button>
  );
};

export default NewPostBtn;
