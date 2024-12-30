"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>{children}</AntdRegistry>
    </QueryClientProvider>
  );
};

export default Providers;
