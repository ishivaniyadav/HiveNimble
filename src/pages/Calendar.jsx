import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

export default function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState({});
  const [input, setInput] = useState("");
  const key = date.toDateString();
  const list = reminders[key] || [];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reminders"));
    if (stored) setReminders(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (e) => {
    e.preventDefault();
    if (!input) return;
    const newList = [...list, input];
    setReminders({ ...reminders, [key]: newList });
    setInput("");
  };

  const deleteReminder = (idx) => {
    const newList = list.filter((_, i) => i !== idx);
    setReminders({ ...reminders, [key]: newList });
  };

  return (
    <section className="calendar-sec">
      <h2>Calendar & Reminders</h2>
      <div className="calendar-wrapper">
        <Calendar onChange={setDate} value={date} />
        <div className="reminders-panel">
          <h3>Reminders for {key}</h3>
          {list.length ? (
            <ul>
              {list.map((r, i) => (
                <li key={i}>
                  {r}
                  <button onClick={() => deleteReminder(i)}>🗑️</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reminders.</p>
          )}
          <form onSubmit={addReminder}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="New reminder…"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </section>
  );
}
