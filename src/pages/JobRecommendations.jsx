import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import { apiGetStudents, apiGetJobRecommendations } from "../api/mockApi";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const students = await apiGetStudents();
      const student = students[0];
      const rec = await apiGetJobRecommendations(student.skills, student.cgpa);
      setJobs(rec);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Job Recommendations
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {jobs.map((job) => (
            <Paper key={job.id} sx={{ mb: 2, p: 2 }}>
              <ListItem>
                <ListItemText
                  primary={`${job.title} — ${job.company}`}
                  secondary={`Location: ${job.location} | Required Skills: ${job.requiredSkills.join(", ")}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default JobRecommendations;
