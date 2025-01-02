"use client";

import { useAuth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignUpForm from "./sign-up-form";

export default function SignUpPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (user) {
        console.log("This is the logged in user", user);
        router.push("/main/dashboard");
      } else if (user === null) {
        console.log("no user found");
      } else {
        console.log("auth loading...");
      }
    };

    checkAuth();
  }, [user]);

  if (user === false) return <>Auth loading...</>;
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    );
  }
}
