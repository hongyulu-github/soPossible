import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  return <Grid columns={{ initial: "1", md: "2" }} gap={"5"}></Grid>;
}

export const metadata: Metadata = {
  title: "So Possible - Dashboard",
  description: "View a summary of the soPossible posts",
};
