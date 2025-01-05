"use client";

import {
  Box,
  Button,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { DashboardCard, DashboardSection } from "./styles";

const Dashboard = () => {
  // const user = useAuth();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      gap={3}
      flex={1}
      sx={{
        flexDirection: `${isSm && "column"}`,
      }}
    >
      <Stack flex={1} gap={3}>
        <DashboardSection>
          <Box display="flex" justifyContent="space-between" marginBottom="5px">
            <Typography fontSize={isSm ? "18px" : "20px"}>
              Week's Availability
            </Typography>
            <Button sx={{ minWidth: 0, minHeight: 0, padding: "2px 10px" }}>
              Adjust
            </Button>
          </Box>
          <DashboardCard>
            <CardContent></CardContent>
          </DashboardCard>
        </DashboardSection>
        <DashboardSection sx={{ flex: 2 }}>
          <Typography fontSize={isSm ? "18px" : "20px"} marginBottom="5px">
            Upcoming Events
          </Typography>
          <DashboardCard>
            <CardContent></CardContent>
          </DashboardCard>
        </DashboardSection>
      </Stack>
      <DashboardSection>
        <Typography fontSize={isSm ? "18px" : "20px"} marginBottom="5px">
          Notifications
        </Typography>
        <DashboardCard>
          <CardContent></CardContent>
        </DashboardCard>
      </DashboardSection>
    </Box>
  );
};

export default Dashboard;
