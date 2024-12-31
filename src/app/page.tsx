"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useAuth } from "./lib/firebase/auth";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@mui/material";

export default function Home() {
  const { user } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    if (!user && !["/login", "/signup"].includes(pathname)) {
      // go to login page if not in login or sign up and is not signed in
      redirect("/login");
    }
    console.log(pathname);
  }, [pathname, user]);

  return <Button onClick={() => redirect("/login")}>Go to Login</Button>;
}
