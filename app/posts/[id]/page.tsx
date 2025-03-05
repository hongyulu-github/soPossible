import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueBtn from "./DeleteIssueBtn";
import EditIssueBtn from "./EditIssueBtn";
import PostDetails from "./PostDetails";

interface Props {
  params: { id: string };
}

const fetchPost = (postId: string) =>
  prisma.post.findUnique({
    where: { id: postId },
  });

const PageDetailPage = async ({ params }: Props) => {
  const postId = params.id;
  const post = await fetchPost(postId);
  if (!post) notFound();
  const session = await auth();

  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "5" }}>
      <Box>
        <PostDetails post={post} />
      </Box>
      <Box>
        {session && (
          <Flex direction={"column"} gap={"3"}>
            <EditIssueBtn postId={post.id} />
            <DeleteIssueBtn postId={post.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default PageDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await await fetchPost(params.id);
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
