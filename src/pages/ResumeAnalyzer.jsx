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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { apiAnalyzeResume } from "../api/mockApi";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload a resume first!");
    setLoading(true);
    try {
      const res = await apiAnalyzeResume(file);
      setResult(res);
    } catch (err) {
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ml: { md: "220px" }, mr: { md: "320px" }, mt: "90px", p: 3 }}>
      <Typography variant="h5" fontWeight="700" mb={2}>
        📄 Resume Analyzer
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Upload your resume to get personalized AI-based career insights.
      </Typography>

      <Paper
        sx={{
          p: 4,
          border: "2px dashed #90caf9",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          id="resumeInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="resumeInput">
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            {file ? file.name : "Choose Resume File"}
          </Button>
        </label>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            disabled={loading || !file}
            onClick={handleAnalyze}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </Box>

        {loading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="caption" display="block" mt={1}>
              Analyzing resume content...
            </Typography>
          </Box>
        )}
      </Paper>

      {result && (
        <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            Analysis Result
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Overall Readiness Score
          </Typography>
          <LinearProgress
            variant="determinate"
            value={result.overallScore}
            sx={{ my: 1, height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" mb={2}>
            {result.overallScore}% match with hiring expectations
          </Typography>

          <Typography variant="subtitle2">Extracted Skills</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 1 }}>
            {result.extractedSkills.map((s, i) => (
              <Chip key={i} label={s} color="primary" variant="outlined" />
            ))}
          </Box>

          <Typography variant="subtitle2" mt={2}>
            Missing Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 1 }}>
            {result.missingSkills.map((s, i) => (
              <Chip key={i} label={s} color="error" variant="outlined" />
            ))}
          </Box>

          <Typography variant="subtitle2" mt={2}>
            Recommendations
          </Typography>
          <List dense>
            {result.recommendations.map((r, i) => (
              <ListItem key={i}>
                <ListItemText primary={`• ${r}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
