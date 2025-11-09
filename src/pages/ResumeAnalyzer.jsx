// src/pages/ResumeAnalyzer.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  apiAnalyzeResume,
  apiGetCourseRecommendations,
  apiGetJobRecommendations,
  getSession,
} from "../api/mockApi";

/**
 * ResumeAnalyzer page
 * - Upload a resume (mock) or analyze existing resume by studentId
 * - Shows extracted skills, missing skills, overall score, and recommendations
 * - Also suggests jobs and courses based on analysis
 */
export default function ResumeAnalyzer() {
  const session = getSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [jobRecs, setJobRecs] = useState([]);
  const [courseRecs, setCourseRecs] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const analyze = async () => {
    setLoading(true);
    setAnalysis(null);
    setJobRecs([]);
    setCourseRecs([]);
    try {
      // For demo: if user has studentId, pass that to analysis to use stored mock resume
      const payload = selectedFile ? selectedFile : { studentId: session?.studentId };
      const result = await apiAnalyzeResume(payload);
      setAnalysis(result);

      // Suggest jobs and courses
      const jobs = await apiGetJobRecommendations(result.extractedSkills || [], /*cgpa=*/7.5);
      setJobRecs(jobs);

      const courses = await apiGetCourseRecommendations(result.missingSkills || []);
      setCourseRecs(courses);
    } catch (err) {
      console.error("Analyze error", err);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ml: { md: "220px" }, mr: { md: "320px" }, mt: "90px", p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        📄 Resume Analyzer
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload your resume (PDF/DOCX) or analyze your existing resume. The analyzer will extract skills, show missing skills, a readiness score, and offer job & course suggestions.
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2, border: "1px dashed #90caf9" }}>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="resume-upload">
          <Button component="span" startIcon={<CloudUploadIcon />} variant="outlined">
            {selectedFile ? selectedFile.name : "Choose Resume"}
          </Button>
        </label>

        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={analyze}
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : "Analyze Resume"}
        </Button>

        {loading && <Typography variant="caption" sx={{ ml: 2 }}>Analyzing — please wait...</Typography>}
      </Paper>

      {analysis && (
        <Paper sx={{ mt: 3, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Analysis Result</Typography>

          <Typography variant="subtitle2" color="text.secondary">Overall Readiness</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <LinearProgress variant="determinate" value={analysis.overallScore} sx={{ flex: 1, height: 10, borderRadius: 5 }} />
            <Typography variant="h6" sx={{ minWidth: 48, textAlign: "right" }}>{analysis.overallScore}%</Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Extracted Skills</Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {(analysis.extractedSkills || []).map((s) => <Chip key={s} label={s} color="primary" />)}
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Missing Skills</Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {(analysis.missingSkills || []).map((s) => <Chip key={s} label={s} color="error" variant="outlined" />)}
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Recommendations</Typography>
          <List>
            {(analysis.recommendations || []).map((rec, i) => (
              <ListItem key={i}>
                <ListItemText primary={rec} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Top Job Suggestions</Typography>
          {jobRecs.slice(0, 4).map((j) => (
            <Paper key={j.id} variant="outlined" sx={{ p: 2, mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{j.title}</Typography>
              <Typography variant="caption" color="text.secondary">{j.company} • {j.location}</Typography>
              <Box sx={{ mt: 0.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {j.requiredSkills.map((s) => <Chip key={s} label={s} size="small" />)}
              </Box>
            </Paper>
          ))}

          <Typography variant="subtitle2" sx={{ mt: 2 }}>Recommended Courses</Typography>
          {courseRecs.map((c) => (
            <Box key={c.id} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">{c.title}</Typography>
              <Typography variant="caption" color="text.secondary">{c.provider} • {c.durationWeeks} weeks</Typography>
              <Box>
                <Link href={c.link} target="_blank" rel="noopener">View course</Link>
              </Box>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}
