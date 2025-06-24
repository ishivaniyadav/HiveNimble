import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Hero from "./pages/Hero";
import About from "./pages/About";
import Features from "./pages/Features";
import Projects from "./pages/Projects";
import CalendarSection from "./pages/Calendar";
import Invoices from "./pages/Invoices";
import ClientList from "./pages/ClientList";
import ClientProfile from "./pages/ClientProfile";
import Dashboard from "./pages/Dashboard";
import TimeTracker from "./pages/TimeTracker";

import "./styles/index.css";
import Chatbot from "./components/Chatbot";

const Home = () => (
  <>
    <Hero />
    <About />
    <Features />
    <Projects />
    <Invoices />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarSection /></ProtectedRoute>} />
          <Route path="/time" element={<ProtectedRoute><TimeTracker /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><ClientList /></ProtectedRoute>} />
          <Route path="/clients/:id" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
        <Chatbot />
      </AuthProvider>
    </Router>
  );
}

export default App;
