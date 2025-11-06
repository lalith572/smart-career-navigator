import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { apiGetStudents, apiAddStudent, apiDeleteStudent } from "../api/mockApi";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "" });

  const fetchStudents = async () => {
    const data = await apiGetStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    await apiAddStudent(newStudent);
    setOpen(false);
    setNewStudent({ name: "", email: "", course: "" });
    fetchStudents();
  };

  const handleDelete = async (email) => {
    await apiDeleteStudent(email);
    fetchStudents();
  };

  return (
    <Box sx={{ ml: { md: "220px" }, mr: { lg: "320px" }, mt: "90px", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🎓 Student Management
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Student
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell align="center">
                  <Button color="error" onClick={() => handleDelete(s.email)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <TextField
            label="Course"
            fullWidth
            margin="dense"
            value={newStudent.course}
            onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
