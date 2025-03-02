import PostCard from "@/app/components/PostCard";
import { Post } from "@prisma/client";
import { Grid } from "@radix-ui/themes";

export interface PostQuery {
  page: string;
  search: string;
}
interface Props {
  posts: Post[];
  searchParams: PostQuery;
}

const PostsGrid = ({ posts, searchParams }: Props) => {
  return (
    <Grid columns={{ initial: "1", md: "2", lg: "4" }} gap="3" width="auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default PostsGrid;
