import React from "react";
import "./features.css";

const features = [
  { title: "Client Management", desc: "Keep track of all your clients and their projects." },
  { title: "Time Tracking", desc: "Log hours and stay on top of your work schedule." },
  { title: "Invoice Generator", desc: "Create and send beautiful invoices in seconds." },
  { title: "Calendar Integration", desc: "Plan deadlines and reminders seamlessly." },
];

const Features = () => (
  <section className="features" id="Features">
    <h2>Platform Features</h2>
    <div className="feature-grid">
      {features.map((f, i) => (
        <div className="feature-card" key={i}>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
