import PostCard from "@/app/components/PostCard";
import { prisma } from "@/prisma/client";
import { Grid } from "@radix-ui/themes";

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const PostPage = async (
  {
    // params: { slug },
    // searchParams: { sortOrder },
  }: Props
) => {
  const posts = await prisma.post.findMany();

  return (
    <Grid columns="4" gap="3" rows="repeat(2, 64px)" width="auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default PostPage;
// tip: in directory, [] is required param, [[]] optional params
// tip: searchParams to access query in route
