// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import BarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import StatsCard from "../components/StatsCard";
import { apiGetStudents } from "../api/mockApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);
  const [avgCGPA, setAvgCGPA] = useState(0);
  const [successRate, setSuccessRate] = useState(92);

  useEffect(() => {
    const fetchData = async () => {
      const students = await apiGetStudents();
      setStudentCount(students.length);
      const avg =
        students.reduce((sum, s) => sum + s.cgpa, 0) / students.length;
      setAvgCGPA(avg.toFixed(2));
      setLoading(false);
    };
    fetchData();
  }, []);

  const barData = {
    labels: ["Mar 1-7", "Mar 8-14", "Mar 15-21", "Mar 22-28", "Final Wk"],
    datasets: [
      {
        label: "Earnings (NGN)",
        data: [50000, 120000, 115000, 95000, 150000],
        backgroundColor: "rgba(103, 58, 183, 0.4)",
        borderColor: "#6C63FF",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const donutData = {
    labels: ["Successful", "Unsuccessful"],
    datasets: [
      {
        data: [successRate, 100 - successRate],
        backgroundColor: ["#4CAF50", "#E57373"],
        borderWidth: 2,
      },
    ],
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Students"
            value={studentCount}
            subtitle="Registered in system"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Average CGPA"
            value={avgCGPA}
            subtitle="Across all students"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle="Based on placement simulation"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Monthly Insights
            </Typography>
            <BarChart data={barData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Placement Success Rate
            </Typography>
            <DonutChart data={donutData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
