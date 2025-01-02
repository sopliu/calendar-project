"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthProviderProps } from "./types";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({
  children,
  isPublic = false,
}: Readonly<AuthProviderProps>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("The user found is ", user);
      if (user && isPublic) router.push("/main/dashboard");
      else if (!user && !isPublic) router.push("/login");

      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // TODO: Fix the loading state (flicker) and avoid hydration issues
  if ((user && isPublic) || (!user && !isPublic)) {
    return <Typography>Loading...</Typography>;
  }

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
