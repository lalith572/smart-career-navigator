import { Box, Typography, Grid, Paper } from "@mui/material";
import StatsCard from "../components/StatsCard";
import DonutChart from "../components/DonutChart";

export default function StudentDashboard() {
  return (
    <Box sx={{ ml: { md: "220px" }, mr: { lg: "320px" }, mt: "90px", p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        🎓 Welcome, Student!
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here’s your personal placement readiness progress.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium" mb={2}>
              Your Placement Readiness
            </Typography>
            <DonutChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard title="Courses Completed" value="8 / 10" />
          <Box mt={2}>
            <StatsCard title="Resume Score" value="80%" subtitle="Good progress!" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
