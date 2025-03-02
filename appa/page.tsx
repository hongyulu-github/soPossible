import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>hello {session?.user?.name}</h1>
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
