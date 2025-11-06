import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({ toggleTheme, mode }) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        ml: { md: "220px" },
        width: { md: "calc(100% - 220px)" },
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: theme.palette.mode === "light" ? "#f1f3f6" : "#2a2a2a",
            px: 2,
            py: 0.7,
            borderRadius: 5,
            flexGrow: { xs: 1, sm: 0 },
          }}
        >
          <SearchIcon color="action" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Search...
          </Typography>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src="https://i.pravatar.cc/40" />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight="bold">
                Admin
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
