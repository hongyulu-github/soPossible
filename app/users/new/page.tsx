"use client";
import { useRouter } from "next/navigation"; // IMPORTANT
import React from "react";

const NewUser = () => {
  const router = useRouter();
  // tip: use useRouter hook to navigate is called programming navagation, it returns a rounter object
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push("/users");
        }}
      >
        Create
      </button>
    </div>
  );
};

export default NewUser;
