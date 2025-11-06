import { Box, Grid, Typography, Paper } from "@mui/material";
import StatsCard from "../components/StatsCard";
import CustomBarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import { useEffect, useState } from "react";
import { apiGetDashboard } from "../api/mockApi";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, placed: 0, successRate: 0 });

  useEffect(() => {
    apiGetDashboard().then((data) => setStats(data.stats));
  }, []);

  return (
    <Box sx={{ ml: { md: "220px" }, mr: { lg: "320px" }, mt: "90px", p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        👋 Welcome, Admin!
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here's the current placement performance overview.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2}>
              Placement Trends (Last 4 Weeks)
            </Typography>
            <CustomBarChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              Success Rate
            </Typography>
            <DonutChart />
            <Typography align="center" variant="body2" color="text.secondary">
              {stats.successRate}% Placed | {stats.placed} Successful
            </Typography>
          </Paper>

          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            subtitle="Active this semester"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
