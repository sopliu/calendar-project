import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactNode } from "react";

export type MainPages = "dashboard" | "chat" | "calendar";

export type NavItemsType = {
  name: MainPages;
  label: string;
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
  action: (router: AppRouterInstance) => void;
};
