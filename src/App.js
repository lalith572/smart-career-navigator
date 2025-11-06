import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MessagesPanel from "./components/MessagesPanel";

import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ManageStudents from "./pages/ManageStudents";

function App() {
  const [mode, setMode] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // Watch for auth changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
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
      }),
    [mode]
  );

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole("");
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && <Sidebar />}
        {isAuthenticated && <Header toggleTheme={toggleTheme} mode={mode} />}
        {isAuthenticated && <MessagesPanel />}

        <Routes>
          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {userRole === "admin" ? <Dashboard /> : <StudentDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
              path="/students"
              element={
                <ProtectedRoute>
                  {userRole === "admin" ? <ManageStudents /> : <Navigate to="/" />}
                </ProtectedRoute>
              }
            />

          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumeAnalyzer />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
