"use client";

import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
      <div>{error.message}</div>
    </>
  );
};

export default ErrorPage;
