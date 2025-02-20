import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// tip: the props in layout file recieve page file file as children

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate200 p-5 mr-3">side</aside>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
