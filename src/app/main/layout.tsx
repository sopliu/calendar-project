"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/firebase/auth";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log(user);
      if (user) {
        console.log("This is the logged in user", user);
      } else {
        console.log("no user found");
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  if (user) {
    return (
      <div>
        {/* Include shared UI here e.g. a header or sidebar */}
        {/* <NavBar /> */}
        <div className="mt-20">{children}</div>
      </div>
    );
  }
}
