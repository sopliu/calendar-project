"use client";

import React, { ReactNode } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { Drawer } from "./styles";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Typography } from "@mui/material";

const navItems: {
  label: string;
  activeIcon: ReactNode; // TODO
  inactiveIcon: ReactNode;
  action: (router: AppRouterInstance) => void;
}[] = [
  {
    label: "Dashboard",
    inactiveIcon: <DashboardOutlinedIcon />,
    activeIcon: <DashboardSharpIcon />,
    action: (router: AppRouterInstance) => router.push("/main/dashboard"),
  },
  {
    label: "Chat",
    inactiveIcon: <ChatBubbleOutlineOutlinedIcon />,
    activeIcon: <ChatBubbleOutlinedIcon />,
    action: (router: AppRouterInstance) => router.push("/main/dashboard"),
  },
  {
    label: "Calendar",
    inactiveIcon: <CalendarMonthOutlinedIcon />,
    activeIcon: <CalendarMonthRoundedIcon />,
    action: (router: AppRouterInstance) => router.push("/main/dashboard"),
  },
];

const SideNavbar: React.FC = () => {
  const router = useRouter();
  return (
    <Drawer variant="permanent" sx={{ zIndex: 0 }}>
      <Divider sx={{ margin: "30px 0" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ minWidth: 0, padding: "5px 0" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => item.action(router)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: "auto",
                }}
              >
                {item.inactiveIcon}
              </ListItemIcon>
              <Typography fontSize="10px">{item.label}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavbar;
