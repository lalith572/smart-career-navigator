import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { apiLogout } from "../api/mockApi";

const drawerWidth = 220;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
  { label: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { label: "Resume Analyzer", icon: <WorkIcon />, link: "/resume" },
  { label: "Manage Students", icon: <WorkIcon />, link: "/students" },
];


  const handleLogout = async () => {
    await apiLogout();
    navigate("/login");
  };

  const drawerContent = (
    <>
      <div style={{ padding: "1.5rem" }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          SmartNav
        </Typography>
      </div>

      <List>
        {items.map((it) => (
          <ListItemButton key={it.label} onClick={() => navigate(it.link)}>
            <ListItemIcon>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      <Typography
        variant="caption"
        sx={{ position: "absolute", bottom: 16, left: 20, color: "gray" }}
      >
        © 2025 Smart Career Navigator
      </Typography>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Toggle Button */}
      <IconButton
        color="inherit"
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          display: { md: "none" },
          zIndex: 2000,
          backgroundColor: "white",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
