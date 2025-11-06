import { Box, Typography, Divider, Avatar, useTheme } from "@mui/material";
import { apiGetDashboard } from "../api/mockApi";
import { useEffect, useState } from "react";

export default function MessagesPanel() {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    apiGetDashboard().then((data) => setMessages(data.messages));
  }, []);

  return (
    <Box
      sx={{
        width: 300,
        position: "fixed",
        right: 0,
        top: 64,
        bottom: 0,
        bgcolor: theme.palette.background.paper,
        boxShadow: 1,
        p: 2,
        overflowY: "auto",
        display: { xs: "none", lg: "block" },
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Messages
      </Typography>

      {messages.map((m, i) => (
        <Box key={i} mb={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar>{m.name[0]}</Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {m.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {m.text}
              </Typography>
              <Typography variant="caption" display="block" color="text.disabled">
                {m.time}
              </Typography>
            </Box>
          </Box>
          {i < messages.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Box>
  );
}
