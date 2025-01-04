"use client";

import React from "react";
import { AuthProvider } from "@/components/contexts/auth-provider";
import { Box, CssBaseline } from "@mui/material";
import SideNavbar from "./components/side-navbar";
import ActionBar from "./components/action-bar";
import { DrawerHeader } from "./components/side-navbar/styles";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AuthProvider>
      <Box width="100vw" height="100vh" overflow="hidden" display="flex">
        <CssBaseline />
        <ActionBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <SideNavbar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <>{children}</>
        </Box>
      </Box>
    </AuthProvider>
  );
}
