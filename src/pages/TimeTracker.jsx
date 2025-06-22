import React, { useState, useEffect, useRef } from "react";
import "./timetracker.css";

const TimeTracker = () => {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [label, setLabel] = useState("");
  const [sessions, setSessions] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("timeSessions"));
    if (stored) setSessions(stored);
  }, []);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    localStorage.setItem("timeSessions", JSON.stringify(sessions));
  }, [sessions]);

  const formatTime = (s) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const saveSession = () => {
    if (!label || seconds === 0) return alert("Label or time is missing!");
    const newSession = { label, duration: seconds, timestamp: new Date().toISOString() };
    setSessions([newSession, ...sessions]);
    setLabel("");
    setSeconds(0);
    setRunning(false);
  };

  const deleteSession = (index) => {
    const updated = sessions.filter((_, i) => i !== index);
    setSessions(updated);
  };

  const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <section className="timer-page">
      <h2>⏳ Track Your Sessions</h2>

      <input
        type="text"
        placeholder="Task Label (e.g., UI Design)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="label-input"
      />

      <div className="timer-display">{formatTime(seconds)}</div>

      <div className="timer-controls">
        <button onClick={() => setRunning(prev => !prev)}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={saveSession}>Save</button>
        <button onClick={() => { setSeconds(0); setRunning(false); }}>Reset</button>
      </div>

      <h3>Total Time Logged: {formatTime(totalTime)}</h3>

      <div className="session-list">
        {sessions.map((session, index) => (
          <div key={index} className="session-item">
            <div>
              <strong>{session.label}</strong>
              <p>{formatTime(session.duration)}</p>
              <small>{new Date(session.timestamp).toLocaleString()}</small>
            </div>
            <button onClick={() => deleteSession(index)}>🗑️</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimeTracker;
