"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import PostForm from "../components/PostForm";

const NewPostBtn = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Post</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>New Possibility</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make a new post to give or ask for help.
        </Dialog.Description>

        <PostForm />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          {/* <Dialog.Close>
            <Button>Post</Button>
          </Dialog.Close> */}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewPostBtn;
