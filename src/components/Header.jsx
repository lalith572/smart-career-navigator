// src/components/Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { apiLogout, getSession } from "../api/mockApi";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const session = getSession();

  // Using Icon8 CDN user logo
  const userLogo =
    "https://img.icons8.com/ios-filled/100/ffffff/user-male-circle.png";

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await apiLogout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: 0.5,
          }}
          onClick={() => navigate("/")}
        >
          Smart Career Navigator
        </Typography>

        {/* Right-side icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Dark/Light Theme Toggle */}
          <Tooltip title="Toggle light/dark theme">
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          {/* User Avatar */}
          <Tooltip title="User menu">
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar
                src={userLogo}
                alt="User"
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid white",
                  backgroundColor: "#1976d2",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              Signed in as{" "}
              <strong style={{ marginLeft: 4 }}>
                {session?.name || "User"}
              </strong>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
