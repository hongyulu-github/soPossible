import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const PrivacyPolicyLink = () => {
  return (
    <Link
      href={
        "https://www.privacypolicies.com/live/8bf4177d-9287-41a4-af89-b153f63281b6"
      }
      className="fixed right-5 bottom-10"
    >
      <Flex justify={"center"} align={"center"}>
        visit our privacy policy <ExternalLinkIcon />
      </Flex>
    </Link>
  );
};

export default PrivacyPolicyLink;
