"use client";

import { useAuth } from "@/lib/firebase/auth";
import { Button, Typography } from "@mui/material";
import { signOut } from "@/lib/firebase/auth";

const Dashboard = () => {
  const user = useAuth();
  return (
    <>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Button onClick={(e) => signOut}>Logout</Button>
    </>
  );
};

export default Dashboard;
