import { Card, styled, Typography } from "@mui/material";

export const DashboardSection = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const DashboardCard = styled(Card)(({ theme }) => ({
  flex: 1,
  boxShadow: "none",
  border: `1px solid ${theme.palette.primary.light}`,
  backgroundColor: `${theme.palette.primary.light}10`,
  margin: "5px 0",
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.values.xs
    ? "15px"
    : theme.breakpoints.values.sm
    ? "17px"
    : "20px",
}));
