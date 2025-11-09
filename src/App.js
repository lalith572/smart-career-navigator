// src/App.js
// At top

import React from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import JobRecommendations from "./pages/JobRecommendations";
import CourseRecommendations from "./pages/CourseRecommendations";
import Chatbot from "./pages/Chatbot";
import { getSession } from "./api/mockApi";

// import ThemeToggle from "./components/ThemeToggle";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#6C63FF" },
    background: { default: "#f9f9f9" },
  },
  typography: { fontFamily: "Inter, sans-serif" },
});

// Protect routes (redirects to /login if not logged in)
function PrivateRoute({ children }) {
  const session = getSession();
  return session ? children : <Navigate to="/login" replace />;
}

// Main App Layout
const AppLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "24px", marginTop: "64px" }}>
        {children}
      </main>
    </div>
  );
};

const App = () => {
  const session = getSession();
  const role = session?.role;
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Router> */}
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {role === "admin" ? (
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                ) : (
                  <Navigate to="/student" replace />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                {role === "admin" ? (
                  <AppLayout>
                    <Students />
                  </AppLayout>
                ) : (
                  <Navigate to="/student" replace />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <PrivateRoute>
                <AppLayout>
                  <ResumeAnalyzer />
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <PrivateRoute>
                {role === "student" ? (
                  <AppLayout>
                    <StudentDashboard />
                  </AppLayout>
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <AppLayout>
                  <JobRecommendations />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <AppLayout>
                  <CourseRecommendations />
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* AI Chatbot */}
          <Route
            path="/chatbot"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Chatbot />
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default App;
