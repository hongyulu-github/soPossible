import { auth } from "@/auth";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>hello {session?.user?.name}</h1>
      <ProductCard />
    </main>

    // {/* <Image src={jellyfish} alt="jellyfish" /> */}

    // {/* <Image
    //   src="https://bit.ly/react-cover"
    //   alt="coffee"
    //   fill
    //   className="object-cover"
    // /> */}
  );
}
