import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Link } from "@mui/material";
import { apiGetCourseRecommendations } from "../api/mockApi";

const CourseRecommendations = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await apiGetCourseRecommendations(["React", "SQL"]);
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Recommended Courses
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        courses.map((course) => (
          <Paper key={course.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{course.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Provider: {course.provider}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Skills: {course.skillsTaught.join(", ")}
            </Typography>
            <Link href={course.link} target="_blank" sx={{ mt: 1, display: "block" }}>
              View Course
            </Link>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default CourseRecommendations;
