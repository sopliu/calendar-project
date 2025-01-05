"use client";

import React from "react";
import { AuthProvider } from "@/components/contexts/auth-provider";
import { Box, CssBaseline } from "@mui/material";
import SideNavbar from "./components/side-navbar";
import ActionBar from "./components/action-bar";
import { DrawerHeader } from "./components/side-navbar/styles";
import { usePathname } from "next/navigation";
import { MainPages } from "./components/side-navbar/types";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const path = usePathname().split("/");

  return (
    <AuthProvider>
      <Box width="100vw" height="100vh" overflow="hidden" display="flex">
        <CssBaseline />
        <ActionBar />
        <SideNavbar activePage={path[path.length - 1] as MainPages} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <>{children}</>
        </Box>
      </Box>
    </AuthProvider>
  );
}
