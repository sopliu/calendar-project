"use client";

import { useAuth } from "@/lib/firebase/auth";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const user = useAuth();
  return <Typography>{user ? "logged in" : "not logged in"}</Typography>;
};

export default Dashboard;
