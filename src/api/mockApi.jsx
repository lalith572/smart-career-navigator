// src/api/mockApi.js
export const apiLoginUser = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        resolve({ token: "fake-admin-token", role: "admin" });
      } else if (email === "student@gmail.com" && password === "student123") {
        resolve({ token: "fake-student-token", role: "student" });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 800);
  });

export const apiRegisterUser = (form) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ message: "User registered", user: form }), 1000);
  });

export const apiGetDashboard = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalStudents: 124,
          placed: 97,
          successRate: 78,
        },
        bar: [
          { name: "Week 1", value: 30 },
          { name: "Week 2", value: 50 },
          { name: "Week 3", value: 70 },
          { name: "Week 4", value: 90 },
        ],
        donut: [
          { name: "Placed", value: 78 },
          { name: "Unplaced", value: 22 },
        ],
        messages: [
          { name: "John Doe", text: "Interview scheduled!", time: "2h ago" },
          { name: "Priya", text: "Uploaded new resume.", time: "5h ago" },
          { name: "Karan", text: "Completed skill test.", time: "1d ago" },
        ],
      });
    }, 1000);
  });


export const apiAnalyzeResume = (file) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overallScore: 78,
        extractedSkills: ["React", "Node.js", "Java", "SQL", "Git"],
        missingSkills: ["AWS", "Docker"],
        recommendations: [
          "Add AWS experience section",
          "Include measurable project achievements",
          "Emphasize teamwork and leadership",
        ],
      });
    }, 2000);
  });

export const apiLogout = () =>
  new Promise((resolve) => {
    localStorage.clear();
    setTimeout(() => resolve({ message: "Logged out" }), 500);
  });


let mockStudents = [
  { name: "John Doe", email: "john@student.com", course: "CSE" },
  { name: "Priya Sharma", email: "priya@student.com", course: "ECE" },
];

export const apiGetStudents = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockStudents), 500));

export const apiAddStudent = (student) =>
  new Promise((resolve) => {
    mockStudents.push(student);
    setTimeout(() => resolve({ message: "Student added" }), 500);
  });

export const apiDeleteStudent = (email) =>
  new Promise((resolve) => {
    mockStudents = mockStudents.filter((s) => s.email !== email);
    setTimeout(() => resolve({ message: "Deleted" }), 500);
  });
