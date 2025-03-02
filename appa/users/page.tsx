import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder: string; direction: string };
}

const UsersPage = async ({ searchParams: { sortOrder, direction } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href={"/users/new"} className="btn">
        New User
      </Link>
      {/* <Suspense fallback={<p>loading...</p>}>  */}
      {/* tip: Suspense in react */}
      <UserTable sortOrder={sortOrder} direction={direction} />
      {/* </Suspense> */}
    </>
  );
};

export default UsersPage;
