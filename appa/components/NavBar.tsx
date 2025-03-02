"use client";

import { Avatar, Box, DropdownMenu, Flex, Container } from "@radix-ui/themes";
import classNames from "classnames";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

// const NavBar = () => {
//   const { status, data: session } = useSession();

//   const navLinks: { title: string; href: string; isRender?: boolean }[] = [
//     { title: "Home", href: "/" },
//     { title: "Post", href: "/posts" },
//     { title: "Create", href: "/create" },
//     {
//       title: "Sign out",
//       href: "/api/auth/signout",
//       isRender: status === "authenticated",
//     },
//     {
//       title: "Sign in",
//       href: "/api/auth/signin",
//       isRender: status === "unauthenticated",
//     },
//   ];

//   return (
//     <Flex
//       className="bg-slate-300"
//       direction={"row"}
//       justify={"end"}
//       pr={"3"}
//       gap={"3"}
//     >
//       {navLinks.map((link) => {
//         if (link.isRender === undefined || link.isRender) {
//           return (
//             <Link key={link.href} href={link.href}>
//               <Text> {link.title}</Text>
//             </Link>
//           );
//         }
//         return null;
//       })}
//     </Flex>
//   );
// };

// export default NavBar;

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="p-5 border-b">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            {NavLinks()}
          </Flex>
          {AuthStatus({ session })}
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Post", href: "/posts" },
    { label: "Create", href: "/create" },
  ];

  return (
    <ul className="flex gap-5">
      {links.map((link) => (
        <li
          className={classNames({
            "nav-link": true,
            "!text-zinc-900": currentPath === link.href,
          })}
          key={link.href}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = ({ session }: { session: Session | null }) => {
  console.log("session in AuthStatus", session);
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
            <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
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
      {/* <Link href={"/api/auth/signout"}>Sigh out</Link> */}
    </Box>
  );
};

export default NavBar;
