import React from "react";
import { AuthProvider } from "@/components/contexts/auth-provider";
import { Box } from "@mui/material";
import ActionBar from "./components/action-bar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Box width="100vw" height="100vh" overflow="hidden">
        <>
          <ActionBar />
          {children}
        </>
      </Box>
    </AuthProvider>
  );
}
