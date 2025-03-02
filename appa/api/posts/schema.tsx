import { z } from "zod";

const postPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.string().min(1),
  image: z.string(),
});

export default postPostSchema;
