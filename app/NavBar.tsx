"use client";
import { HomeIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Avatar, Box, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="sticky top-0 left-0 h-screen bg-white shadow-md z-50 p-5 border-r">
      <Flex direction={"column"} justify={"between"} height={"100%"}>
        <Flex justify={"between"} direction={"column"} gap={"3"}>
          <Link href={"/"}>
            <Image
              src={"/images/logo.jpg"}
              alt="soPossible"
              width={"50"}
              height={"50"}
            />
          </Link>
          {NavLinks()}
        </Flex>
        {AuthStatus({ session })}
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Posts",
      href: "/",
      icon: <HomeIcon className="w-5 h-5 inline" />,
    },
    {
      label: "Create",
      href: "/posts/new",
      icon: <PlusCircledIcon className="w-5 h-5 inline" />,
    },
  ];

  return (
    <ul className="flex gap-3 flex-col">
      {links.map((link) => (
        <li
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": currentPath === link.href,
          })}
          key={link.href}
        >
          <Link href={link.href}>
            <Flex gap={"2"} justify={"start"} align={"center"}>
              {link.icon}
              {link.label}
            </Flex>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = ({ session }: { session: Session | null }) => {
  return (
    <Box>
      {session && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              radius="full"
              size={"2"}
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user!.email!}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Sigh out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {!session && (
        <Link className="nav-link" href={"/api/auth/signin"}>
          Sigh in
        </Link>
      )}
    </Box>
  );
};

export default NavBar;
