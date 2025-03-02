import PostCard from "@/app/components/PostCard";
import { Post } from "@prisma/client";
import { Grid } from "@radix-ui/themes";

export interface PostQuery {
  orderBy: keyof Post;
  page: string;
}
interface Props {
  posts: Post[];
  searchParams: PostQuery;
}

const PostsGrid = ({ posts, searchParams }: Props) => {
  const { orderBy: orderByQuery } = searchParams;
  return (
    <Grid columns={{ initial: "1", md: "2", lg: "4" }} gap="3" width="auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};

// export const columns: {
//   label: string;
//   value: keyof Post;
//   className?: string;
// }[] = [
//   {
//     label: "Title",
//     value: "title",
//   },
//   {
//     label: "Status",
//     value: "status",
//     className: "hidden md:table-cell",
//   },
//   {
//     label: "Create Time",
//     value: "createdAt",
//     className: "hidden md:table-cell",
//   },
// ];

export default PostsGrid;
