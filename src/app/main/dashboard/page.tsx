"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const user = useAuth();

  return (
    <>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
      <Typography>{user ? "logged in" : "not logged in"}</Typography>
    </>
  );
};

export default Dashboard;
