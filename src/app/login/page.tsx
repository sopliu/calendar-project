"use client";

import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     if (user) {
  //       console.log("This is the logged in user", user);
  //       router.push("/main/dashboard");
  //     } else {
  //       console.log("no user found");
  //     }
  //   };

  //   checkAuth();
  // }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }
}
