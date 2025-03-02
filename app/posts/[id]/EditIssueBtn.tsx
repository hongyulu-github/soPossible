import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueBtn = ({ postId }: { postId: string }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${postId}/edit`}> Edit Post</Link>
    </Button>
  );
};

export default EditIssueBtn;
