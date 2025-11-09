// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DonutChart from "../components/DonutChart";
import StatsCard from "../components/StatsCard";
import {
  apiGetStudents,
  apiAnalyzeResume,
  apiGetPlacementRecommendation,
  apiGetJobRecommendations,
  apiGetCourseRecommendations,
  getSession,
} from "../api/mockApi";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [placementData, setPlacementData] = useState(null);
  const [jobRecs, setJobRecs] = useState([]);
  const [courseRecs, setCourseRecs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = getSession();
        if (!session?.studentId) return;

        const students = await apiGetStudents();
        const stu = students.find((s) => s.id === session.studentId);
        setStudent(stu);

        const resume = await apiAnalyzeResume({ studentId: stu.id });
        setResumeData(resume);

        const placement = await apiGetPlacementRecommendation({
          skills: resume.extractedSkills,
          cgpa: stu.cgpa,
        });
        setPlacementData(placement);

        const jobs = await apiGetJobRecommendations(stu.skills, stu.cgpa);
        setJobRecs(jobs);

        const courses = await apiGetCourseRecommendations(
          resume.missingSkills
        );
        setCourseRecs(courses);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <Typography variant="h4" fontWeight={700} mb={2}>
        Welcome, {student?.name} 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Here’s an overview of your placement readiness and career insights.
      </Typography>

      <Grid container spacing={3}>
        {/* Resume & Placement */}
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Your CGPA"
            value={student?.cgpa}
            subtitle={student?.course}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Skills Found"
            value={resumeData?.extractedSkills.length || 0}
            subtitle={resumeData?.extractedSkills.join(", ")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Placement Probability"
            value={`${placementData?.probability}%`}
            subtitle={
              placementData?.willGetPlaced
                ? "You’re likely to get placed 🎯"
                : "Needs improvement 🚀"
            }
          />
        </Grid>

        {/* Donut Chart for Placement Probability */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Placement Prediction
            </Typography>
            <DonutChart
              data={{
                labels: ["Placement Chance", "Gap"],
                datasets: [
                  {
                    data: [
                      placementData?.probability || 0,
                      100 - (placementData?.probability || 0),
                    ],
                    backgroundColor: ["#4CAF50", "#E57373"],
                    borderWidth: 2,
                  },
                ],
              }}
            />
            <Typography variant="body2" mt={2} color="text.secondary">
              {placementData?.reasons.join(" • ")}
            </Typography>
          </Paper>
        </Grid>

        {/* Missing Skills */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Missing Skills
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Based on your resume, these are the skills to focus on:
            </Typography>
            {resumeData?.missingSkills.length ? (
              <List dense>
                {resumeData.missingSkills.map((skill) => (
                  <ListItem key={skill}>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                Great job! No missing skills found 🎉
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recommended Jobs */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Recommended Jobs
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {jobRecs.slice(0, 3).map((job) => (
              <Box key={job.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company} — {job.location}
                </Typography>
                <Typography variant="caption">
                  Skills: {job.requiredSkills.join(", ")}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recommended Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Recommended Courses
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {courseRecs.slice(0, 3).map((course) => (
              <Box key={course.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.provider}
                </Typography>
                <Typography variant="caption">
                  Skills: {course.skillsTaught.join(", ")}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
