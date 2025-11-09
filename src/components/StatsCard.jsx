import React from "react";
import { Paper, Typography} from "@mui/material";

const StatsCard = ({ title, value, subtitle }) => (
  <Paper
    elevation={4}
    sx={{
      p: 3,
      borderRadius: 3,
      textAlign: "center",
      background:
        "linear-gradient(145deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))",
    }}
  >
    <Typography variant="h6" fontWeight={600}>
      {title}
    </Typography>
    <Typography variant="h4" fontWeight={700} mt={1}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary" mt={0.5}>
      {subtitle}
    </Typography>
  </Paper>
);

export default StatsCard;
