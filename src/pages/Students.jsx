// src/pages/Students.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  apiGetStudents,
  apiSaveStudent,
  apiDeleteStudent,
} from "../api/mockApi";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    course: "",
    cgpa: "",
    skills: "",
  });
  const [error, setError] = useState("");

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await apiGetStudents();
      setStudents(res);
    } catch (err) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open dialog for new/edit student
  const handleOpenDialog = (student = null) => {
    if (student) {
      setForm({
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        cgpa: student.cgpa,
        skills: student.skills.join(", "),
      });
    } else {
      setForm({
        id: null,
        name: "",
        email: "",
        course: "",
        cgpa: "",
        skills: "",
      });
    }
    setError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  // Save (Add/Edit)
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        cgpa: parseFloat(form.cgpa),
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      await apiSaveStudent(payload);
      setOpenDialog(false);
      fetchStudents();
    } catch (err) {
      setError("Failed to save student");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await apiDeleteStudent(id);
      fetchStudents();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.3 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "cgpa", headerName: "CGPA", width: 100 },
    {
      field: "skills",
      headerName: "Skills",
      flex: 1.5,
      renderCell: (params) => params.row.skills.join(", "),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenDialog(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Manage Students
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Add, edit, or remove student records below.
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Student List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Student
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={students}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
            />
          </div>
        )}
      </Paper>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {form.id ? "Edit Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="dense"
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Course"
            name="course"
            value={form.course}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            fullWidth
            label="CGPA"
            name="cgpa"
            type="number"
            value={form.cgpa}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            fullWidth
            label="Skills (comma separated)"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="e.g. React, SQL, Java"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {form.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Students;
