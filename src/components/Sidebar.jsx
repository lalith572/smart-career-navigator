// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";
import { apiLogout, getSession } from "../api/mockApi";

const drawerWidth = 240;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const session = getSession();
  const role = session?.role || "student";

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    await apiLogout();
    navigate("/login");
  };

  const navItems =
    role === "admin"
      ? [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Students", icon: <SchoolIcon />, path: "/students" },
          { text: "Resume Analyzer", icon: <DescriptionIcon />, path: "/resume" },
          { text: "AI Chatbot", icon: <SmartToyIcon />, path: "/chatbot" },
        ]
      : [
          { text: "Student Dashboard", icon: <DashboardIcon />, path: "/studentdashboard" },
          { text: "Resume Analyzer", icon: <DescriptionIcon />, path: "/resume" },
          { text: "Job Recommendations", icon: <WorkIcon />, path: "/jobs" },
          { text: "Course Recommendations", icon: <SchoolIcon />, path: "/courses" },
          { text: "AI Chatbot", icon: <SmartToyIcon />, path: "/chatbot" },
        ];

  const drawerContent = (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: 700,
          color: "#1976d2",
        }}
      >
        Smart Career Navigator
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              "&:hover": { backgroundColor: "rgba(25,118,210,0.1)" },
              mb: 0.5,
            }}
          >
            <ListItemIcon sx={{ color: "#1976d2" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#e53935" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* Top bar for mobile */}
      <Box
        sx={{
          display: { md: "none" },
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1201,
          bgcolor: "#fff",
          borderBottom: "1px solid #eee",
          px: 2,
          py: 1,
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Smart Career Navigator
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
          },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Sidebar for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
