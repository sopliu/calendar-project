"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { Button, Typography } from "@mui/material";
import { signOut } from "@/lib/auth";

const Dashboard = () => {
  const user = useAuth();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Dashboard;
