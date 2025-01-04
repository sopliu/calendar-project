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
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropIcon from "@mui/icons-material/ArrowDropDownRounded";
import GroupAddIcon from "@mui/icons-material/GroupAddRounded";
import EventIcon from "@mui/icons-material/EventRounded";
import EventAvailablIcon from "@mui/icons-material/EventAvailableRounded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentIndRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import LogoTitle from "./logo-title";
import { useAuth } from "@/components/contexts/auth-provider";
import { signOut } from "@/lib/firebase/auth";
import { AppBar } from "./styles";

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

interface ActionBarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  open = false,
  handleDrawerOpen = () => {},
}) => {
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
    <AppBar position="fixed" open={open}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <LogoTitle />
          <Box sx={{ margin: "0 10px", display: "flex" }}>
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
                <MenuItem
                  key={action.label}
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
              ))}
            </Menu>
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ActionBar;
