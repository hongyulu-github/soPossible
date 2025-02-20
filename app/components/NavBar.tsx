"use client";

import { Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  const navLinks: { title: string; href: string; isRender?: boolean }[] = [
    { title: "Home", href: "/" },
    { title: "Post", href: "/posts" },
    { title: "Create", href: "/create" },
    {
      title: "Sign out",
      href: "/api/auth/signout",
      isRender: status === "authenticated",
    },
    {
      title: "Sign in",
      href: "/api/auth/signin",
      isRender: status === "unauthenticated",
    },
  ];

  return (
    <Flex
      className="bg-slate-300"
      direction={"row"}
      justify={"end"}
      pr={"3"}
      gap={"3"}
    >
      {navLinks.map((link) => {
        if (link.isRender === undefined || link.isRender) {
          return (
            <Link key={link.href} href={link.href}>
              <Text> {link.title}</Text>
            </Link>
          );
        }
        return null;
      })}
    </Flex>
  );
};

export default NavBar;
