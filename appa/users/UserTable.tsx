import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
  direction: string;
}

const UserTable = async ({ sortOrder, direction }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // only in fetch func
    // next: { revalidate: 10 }, // get the data every 10s
  });
  //cache: "no-store", next thinks its muteable data, is caching, will think it static
  //tip: alway try to fetch data in server component and then send markup to client side
  const users: User[] = await res.json();

  const isAscending = direction === "asc";
  const nextDirection = isAscending ? "desc" : "asc";

  //   sort(users).asc((u) => u[sortOrder]);
  const sortedUsers = isAscending
    ? sort(users).asc(sortOrder === "email" ? (u) => u.email : (u) => u.name)
    : sort(users).desc(sortOrder === "email" ? (u) => u.email : (u) => u.name);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href={`/users?sortOrder=name&direction=${nextDirection}`}>
              Name {sortOrder === "name" && isAscending ? "↑" : "↓"}
            </Link>
          </th>
          <th>
            <Link href={`/users?sortOrder=email&direction=${nextDirection}`}>
              Email {sortOrder === "email" && isAscending ? "↑" : "↓"}
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
