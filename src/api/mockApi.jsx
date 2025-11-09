// src/api/mockApi.js
// ------------------
// Mock backend for Smart Career Navigator
// Purpose: provide realistic dummy data + async APIs for frontend development
// Style: clean, documented, and easily replaceable with real backend calls later.

const WAIT_MS = 600;

/** Utility: simulate network delay */
function wait(ms = WAIT_MS) {
  return new Promise((res) => setTimeout(res, ms));
}

/* ------------------------
   In-memory mock datasets
   ------------------------ */

let mockStudents = [
  {
    id: 1,
    name: "Aarav Kumar",
    email: "aarav@student.com",
    course: "Computer Science",
    cgpa: 8.4,
    skills: ["Java", "SQL", "Data Structures"],
    resumeId: 101,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@student.com",
    course: "Information Technology",
    cgpa: 8.1,
    skills: ["Python", "Machine Learning", "Pandas"],
    resumeId: 102,
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@student.com",
    course: "Electronics",
    cgpa: 7.6,
    skills: ["C", "Embedded Systems", "PCB Design"],
    resumeId: 103,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@student.com",
    course: "Computer Science",
    cgpa: 9.0,
    skills: ["React", "Node.js", "TypeScript"],
    resumeId: 104,
  },
];

let mockResumes = [
  {
    id: 101,
    studentId: 1,
    text: "Aarav Kumar — B.Tech CSE — Projects: Student Management System (Java, MySQL). Skills: Java, SQL, Data Structures.",
    skills: ["Java", "SQL", "Data Structures"],
    experienceYears: 0.5,
  },
  {
    id: 102,
    studentId: 2,
    text: "Priya Sharma — B.Tech IT — Projects: Sentiment Analysis (Python). Skills: Python, Machine Learning, Pandas.",
    skills: ["Python", "Machine Learning", "Pandas"],
    experienceYears: 1.0,
  },
  {
    id: 103,
    studentId: 3,
    text: "Rahul Verma — B.E ECE — Internship: Embedded Systems Intern. Skills: C, Embedded Systems, PCB Design.",
    skills: ["C", "Embedded Systems", "PCB Design"],
    experienceYears: 0.8,
  },
  {
    id: 104,
    studentId: 4,
    text: "Sneha Reddy — B.Tech CSE — Intern at Startup (Frontend). Skills: React, Node.js, TypeScript.",
    skills: ["React", "Node.js", "TypeScript"],
    experienceYears: 1.5,
  },
];

const mockJobs = [
  { id: "job-1", title: "Junior Java Developer", company: "TechCore Pvt Ltd", requiredSkills: ["Java", "SQL", "Data Structures"], minCgpa: 7.5, location: "Bengaluru" },
  { id: "job-2", title: "Machine Learning Intern", company: "DataNext", requiredSkills: ["Python", "Machine Learning", "Pandas"], minCgpa: 7.0, location: "Hyderabad" },
  { id: "job-3", title: "Frontend Engineer (React)", company: "Webify", requiredSkills: ["React", "TypeScript", "HTML"], minCgpa: 7.8, location: "Remote" },
  { id: "job-4", title: "Embedded Systems Engineer", company: "InnoTech", requiredSkills: ["C", "Embedded Systems", "RTOS"], minCgpa: 7.0, location: "Chennai" },
  { id: "job-5", title: "Fullstack Developer", company: "CloudWorks", requiredSkills: ["Node.js", "React", "SQL"], minCgpa: 8.0, location: "Pune" },
];

const mockCourses = [
  { id: "course-1", title: "Docker & Containerization for Beginners", provider: "Coursera", skillsTaught: ["Docker"], durationWeeks: 4, link: "https://www.example.com/docker-course" },
  { id: "course-2", title: "Spring Boot Fundamentals", provider: "Udemy", skillsTaught: ["Spring Boot"], durationWeeks: 6, link: "https://www.example.com/spring-boot" },
  { id: "course-3", title: "Advanced React and TypeScript", provider: "Pluralsight", skillsTaught: ["React", "TypeScript"], durationWeeks: 5, link: "https://www.example.com/react-ts" },
  { id: "course-4", title: "Intro to Machine Learning with Python", provider: "edX", skillsTaught: ["Python", "Machine Learning"], durationWeeks: 8, link: "https://www.example.com/ml-python" },
  { id: "course-5", title: "SQL for Data Analysis", provider: "DataCamp", skillsTaught: ["SQL"], durationWeeks: 3, link: "https://www.example.com/sql-data" },
];

const mockUsers = [
  { id: "u-admin", name: "Admin User", email: "admin@gmail.com", password: "admin123", role: "admin" },
  { id: "u-stu1", name: "Aarav Kumar", email: "aarav@student.com", password: "aarav123", role: "student", studentId: 1 },
  { id: "u-stu2", name: "Priya Sharma", email: "priya@student.com", password: "priya123", role: "student", studentId: 2 },
  { id: "u-stu3", name: "Rahul Verma", email: "rahul@student.com", password: "rahul123", role: "student", studentId: 3 },
  { id: "u-stu4", name: "Sneha Reddy", email: "sneha@student.com", password: "sneha123", role: "student", studentId: 4 },
];

/* ------------------------
   AUTH APIs
   ------------------------ */

export async function apiLoginUser(email, password) {
  await wait();
  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password");

  const session = {
    token: `mock-token-${user.id}`,
    name: user.name,
    role: user.role,
    email: user.email,
    studentId: user.studentId || null,
  };
  localStorage.setItem("scn_session", JSON.stringify(session));
  localStorage.setItem("token", session.token);
  localStorage.setItem("role", session.role);
  return session;
}

export async function apiRegisterUser({ name, email, password, course = "Computer Science" }) {
  await wait();
  if (mockUsers.some((u) => u.email === email)) throw new Error("Email already exists");

  const newStudentId = mockStudents.length + 1;
  const newStudent = { id: newStudentId, name, email, course, cgpa: 0.0, skills: [], resumeId: null };
  mockStudents.push(newStudent);
  mockUsers.push({ id: `u-${Date.now()}`, name, email, password, role: "student", studentId: newStudentId });
  return { message: "Registered successfully", student: newStudent };
}

export async function apiLogout() {
  await wait(200);
  localStorage.removeItem("scn_session");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return { message: "Logged out" };
}

/* ------------------------
   STUDENTS
   ------------------------ */

export async function apiGetStudents() {
  await wait();
  return JSON.parse(JSON.stringify(mockStudents));
}

export async function apiSaveStudent(student) {
  await wait();
  if (student.id) {
    mockStudents = mockStudents.map((s) => (s.id === student.id ? { ...s, ...student } : s));
    return { message: "Updated", student };
  }
  const newStudent = { ...student, id: mockStudents.length + 1 };
  mockStudents.push(newStudent);
  return { message: "Created", student: newStudent };
}

export async function apiDeleteStudent(studentId) {
  await wait();
  const before = mockStudents.length;
  mockStudents = mockStudents.filter((s) => s.id !== studentId);
  return { message: "Deleted", removed: before - mockStudents.length };
}

/* ------------------------
   DASHBOARD (ADMIN)
   ------------------------ */
export async function apiGetDashboard() {
  await wait();
  return {
    totalStudents: mockStudents.length,
    placedStudents: 8,
    avgCgpa: 7.9,
    placementRate: Math.round((8 / mockStudents.length) * 100),
    stats: [
      { month: "Jan", placed: 2, total: 3 },
      { month: "Feb", placed: 1, total: 2 },
      { month: "Mar", placed: 3, total: 4 },
      { month: "Apr", placed: 2, total: 3 },
    ],
    messages: [
      { from: "Placement Officer", text: "Next mock interview round on Friday!" },
      { from: "Admin", text: "Update your resume before placement drive." },
      { from: "Company HR", text: "Infosys pre-placement talk scheduled next week." },
    ],
  };
}

/* ------------------------
   RESUME ANALYSIS
   ------------------------ */
export async function apiGetResumes() {
  await wait();
  return JSON.parse(JSON.stringify(mockResumes));
}

export async function apiAnalyzeResume(payload) {
  await wait(900);
  let resume;
  if (typeof payload === "number") {
    resume = mockResumes.find((r) => r.id === payload);
  } else if (payload && payload.studentId) {
    resume = mockResumes.find((r) => r.studentId === payload.studentId);
  }
  if (!resume) {
    resume = { id: 999, text: "Uploaded resume (mock). Skills: JavaScript, HTML, CSS.", skills: ["JavaScript", "HTML", "CSS"], experienceYears: 0.3 };
  }
  const expectedSkills = ["Docker", "React", "SQL", "Python", "AWS"];
  const missing = expectedSkills.filter((s) => !resume.skills.includes(s));
  const score = Math.max(45, 90 - missing.length * 8 - (2 - (resume.experienceYears || 0)) * 5);
  const suggestions = [
    ...(missing.includes("React") ? ["Take 'Advanced React & TypeScript'"] : []),
    ...(missing.includes("Docker") ? ["Complete 'Docker & Containerization'"] : []),
    "Add measurable metrics to projects (e.g., improved performance by X%).",
  ];
  return {
    resumeId: resume.id,
    studentId: resume.studentId,
    extractedSkills: resume.skills,
    missingSkills: missing,
    overallScore: Math.round(score),
    recommendations: suggestions,
    rawText: resume.text,
  };
}

/* ------------------------
   JOB & COURSE RECOMMENDATIONS
   ------------------------ */
export async function apiGetJobRecommendations(skills = [], cgpa = 0) {
  await wait();
  const scored = mockJobs.map((job) => {
    const skillMatches = job.requiredSkills.filter((s) => skills.includes(s)).length;
    const cgpaOk = cgpa >= job.minCgpa ? 1 : 0;
    const score = skillMatches * 10 + cgpaOk * 5;
    return { ...job, score, skillMatches };
  });
  scored.sort((a, b) => b.score - a.score || b.skillMatches - a.skillMatches);
  return scored.slice(0, 8);
}

export async function apiGetCourseRecommendations(missingSkills = []) {
  await wait();
  return mockCourses
    .map((c) => {
      const teachMatches = c.skillsTaught.filter((s) => missingSkills.includes(s));
      return { ...c, teachMatchesCount: teachMatches.length };
    })
    .filter((c) => c.teachMatchesCount > 0)
    .sort((a, b) => b.teachMatchesCount - a.teachMatchesCount);
}

/* ------------------------
   PLACEMENT RECOMMENDATION
   ------------------------ */
export async function apiGetPlacementRecommendation({ skills = [], cgpa = 0 }) {
  await wait();
  const highDemand = ["React", "Python", "Java", "SQL", "Machine Learning", "Docker", "AWS", "Node.js"];
  const demandMatches = highDemand.filter((s) => skills.includes(s)).length;
  const skillScore = Math.min(50, demandMatches * 10);
  const cgpaScore = Math.min(40, Math.max(0, (cgpa - 5) * 8));
  let probability = Math.round(40 + skillScore + cgpaScore);
  probability = Math.max(8, Math.min(98, probability));
  const willGetPlaced = probability >= 65;
  const reasons = [];
  if (willGetPlaced) {
    reasons.push("Strong match with high-demand skills");
    if (cgpa >= 8) reasons.push("Good CGPA");
  } else {
    reasons.push("Missing some in-demand skills");
    if (cgpa < 7) reasons.push("Low CGPA compared to job cutoffs");
  }
  return { probability, willGetPlaced, reasons };
}

/* ------------------------
   UTILITIES
   ------------------------ */
export function getSession() {
  const s = localStorage.getItem("scn_session");
  return s ? JSON.parse(s) : null;
}

export function resetMockData() {
  return Promise.resolve(true);
}
