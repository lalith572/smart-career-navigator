// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle = ({ onToggle, mode }) => {
  const [themeMode, setThemeMode] = useState(mode || "light");

  // Handle theme switching
  const handleThemeChange = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
    localStorage.setItem("scn_theme", newMode);
    onToggle(newMode);
  };

  useEffect(() => {
    const saved = localStorage.getItem("scn_theme");
    if (saved) {
      setThemeMode(saved);
      onToggle(saved);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Tooltip title={`Switch to ${themeMode === "light" ? "Dark" : "Light"} Mode`}>
      <IconButton
        onClick={handleThemeChange}
        color="inherit"
        sx={{
          transition: "0.3s",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
