"use client";

import {
  Box,
  Button,
  CardContent,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { CardTitle, DashboardCard, DashboardSection } from "./styles";

const Dashboard = () => {
  // const user = useAuth();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      gap={{ sx: 2, md: 3 }}
      flex={1}
      sx={{
        flexDirection: `${isSm && "column"}`,
      }}
    >
      <Stack flex={1} gap={{ sx: 2, md: 3 }}>
        <DashboardSection>
          <Box display="flex" justifyContent="space-between">
            <CardTitle>Week&apos;s Availability</CardTitle>
            <Button
              variant="outlined"
              sx={{ minWidth: 0, minHeight: 0, padding: "0px 10px" }}
            >
              Adjust
            </Button>
          </Box>
          <DashboardCard>
            <CardContent></CardContent>
          </DashboardCard>
        </DashboardSection>
        <DashboardSection sx={{ flex: 2 }}>
          <CardTitle>Upcoming Events</CardTitle>
          <DashboardCard>
            <CardContent></CardContent>
          </DashboardCard>
        </DashboardSection>
      </Stack>
      <DashboardSection>
        <CardTitle>Notifications</CardTitle>
        <DashboardCard>
          <CardContent></CardContent>
        </DashboardCard>
      </DashboardSection>
    </Box>
  );
};

export default Dashboard;
