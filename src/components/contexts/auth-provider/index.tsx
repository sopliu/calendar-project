"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthProviderProps } from "./types";
import { auth } from "@/lib/firebase/config";
import React from "react";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({
  children,
  isPublic = false,
}: Readonly<AuthProviderProps>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("The user found is ", user);
      if (user && isPublic) router.push("/dashboard");
      else if (!user && !isPublic) router.push("/login");

      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }
  // TODO: Fix the loading state (flicker) and avoid hydration issues
  if (loading || (user && isPublic) || (!user && !isPublic)) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
