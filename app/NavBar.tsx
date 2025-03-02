"use client";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="p-5 border-b">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}></Link>
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
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Posts", href: "/posts/list" },
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
