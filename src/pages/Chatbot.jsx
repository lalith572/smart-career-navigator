// src/pages/ChatbotComingSoon.jsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        ml: { md: "220px" },
        mr: { md: "320px" },
        mt: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          p: 5,
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(25,118,210,0.1) 0%, rgba(118, 0, 255, 0.1) 100%)",
          backdropFilter: "blur(6px)",
        }}
      >
        <img
          src="https://img.icons8.com/3d-fluency/200/chatbot.png"
          alt="Chatbot"
          style={{ width: "120px", marginBottom: "20px" }}
        />
        <Typography variant="h5" fontWeight={700} mb={1}>
          🤖 AI Chatbot Assistant — Coming Soon!
        </Typography>
        <Typography variant="body1" mb={3} color="text.secondary">
          Our Smart Career Chatbot will soon help students ask questions,
          analyze skills, and get instant guidance powered by AI.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/student")}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default Chatbot;
