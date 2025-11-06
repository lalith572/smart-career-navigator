import { createTheme } from "@mui/material";

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
      background: {
        default: mode === "light" ? "#f9f9fb" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
    typography: { fontFamily: "'Inter', sans-serif" },
  });

export default theme;
