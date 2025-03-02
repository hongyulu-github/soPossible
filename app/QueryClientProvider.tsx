"use client";
import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as RaectQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <RaectQueryClientProvider client={queryClient}>
      {children}
    </RaectQueryClientProvider>
  );
};

export default QueryClientProvider;
