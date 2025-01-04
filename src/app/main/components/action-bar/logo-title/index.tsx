"use client";

import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

const LogoTitle: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <EventNoteIcon sx={{ mr: 1 }} />
      <Typography
        variant={isMd ? "h5" : isXs ? "h6" : "h4"}
        noWrap
        component="a"
        onClick={() => router.push("/main/dashboard")}
        sx={{
          mr: 2,
          display: "flex",
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        CALMEET
      </Typography>
    </>
  );
};

export default LogoTitle;
