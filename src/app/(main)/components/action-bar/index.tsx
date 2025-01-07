"use client";

import React, { useState, MouseEvent, ReactNode } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropIcon from "@mui/icons-material/ArrowDropDownRounded";
import GroupAddIcon from "@mui/icons-material/GroupAddRounded";
import EventIcon from "@mui/icons-material/EventRounded";
import EventAvailablIcon from "@mui/icons-material/EventAvailableRounded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentIndRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import LogoTitle from "./logo-title";
import { useAuth } from "@/components/contexts/auth-provider";
import { signOut } from "@/lib/auth";

const actions: { label: string; icon: ReactNode }[] = [
  { label: "New Group", icon: <GroupAddIcon fontSize="small" /> },
  { label: "New Event", icon: <EventIcon fontSize="small" /> },
  { label: "Edit Availability", icon: <EventAvailablIcon fontSize="small" /> },
];
const settings: { label: string; action: () => void; icon: ReactNode }[] = [
  {
    label: "Your Profile",
    action: () => {}, // TODO
    icon: <AssignmentIndIcon fontSize="small" />,
  },
  {
    label: "Manage Account",
    action: () => {}, // TODO
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    label: "Logout",
    action: async () => {
      await signOut();
    },
    icon: <LogoutIcon fontSize="small" />,
  },
];

const ActionBar: React.FC = ({}) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { user } = useAuth();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: "3", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <LogoTitle />
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                minWidth: 0,
                padding: "4px 5px",
              }}
            >
              <AddRoundedIcon fontSize="small" />
              <ArrowDropIcon fontSize="small" />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                "& .MuiPaper-root": {
                  marginTop: "5px",
                },
              }}
            >
              {actions.map((action) => (
                <Box key={action.label}>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{
                      minHeight: 0,
                      padding: { xs: "5px 20px" },
                    }}
                  >
                    <ListItemIcon sx={{ marginTop: "-3px" }}>
                      {action.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography fontSize="15px">{action.label}</Typography>
                    </ListItemText>
                  </MenuItem>
                  {action.label === "New Event" && <Divider />}
                </Box>
              ))}
            </Menu>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.displayName ?? ""}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.action();
                    }}
                  >
                    <ListItemIcon sx={{ marginTop: "-3px" }}>
                      {setting.icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography fontSize="15px">{setting.label}</Typography>
                    </ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ActionBar;
