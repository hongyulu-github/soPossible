import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: { label: string; count: number; value: Status }[] = [
    { label: "Open Issues", count: open, value: "OPEN" },
    { label: "In-progress Issues", count: inProgress, value: "IN_PROGRESS" },
    { label: "Closed Issues", count: closed, value: "CLOSED" },
  ];
  return (
    <Flex gap={"3"}>
      {statuses.map((status) => (
        <Card key={status.value}>
          <Flex direction={"column"}>
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${status.value}`}
            >
              {status.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {status.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
