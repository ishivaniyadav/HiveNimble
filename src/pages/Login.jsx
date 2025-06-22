import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      alert("Google login failed: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button type="button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}
