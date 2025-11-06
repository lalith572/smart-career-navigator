import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { apiLoginUser } from "../../api/mockApi";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLoginUser(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (onLoginSuccess) onLoginSuccess(res.role);
      alert(`Login successful as ${res.role}`);
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
      }}
    >
      <Paper sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="700" mb={3} textAlign="center">
          Smart Career Navigator
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
          Sign in as Admin or Student
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.3 }}
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>

        <Typography variant="body2" mt={2} textAlign="center">
          Don’t have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
            Register
          </Link>
        </Typography>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          color="text.secondary"
          mt={3}
        >
          Admin: admin@gmail.com / admin123<br />
          Student: student@gmail.com / student123
        </Typography>
      </Paper>
    </Box>
  );
}
