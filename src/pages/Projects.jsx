import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = [
        {
          id: 1,
          name: "QuizBit",
          status: "active",
          freelancer: "Shivram",
          deadline: "2025-07-15",
          description: "A sleek and interactive quiz application built using React.js, designed to provide users with a dynamic multiple-choice quiz experience. Score tracking, responsive UI, and a modern codebase make it an excellent project to showcase your frontend skills.",
          github: "https://ishivaniyadav.github.io/QuizBit/",
        },
        {
          id: 2,
          name: "Weather App",
          status: "in-progress",
          freelancer: "Shubham Shukla",
          deadline: "2025-08-10",
          description: "Weather App is a fast, responsive web tool that provides real-time weather updates based on user location or city input. Designed with a clean UI, it delivers temperature, conditions, and forecasts—making weather tracking simple and accessible anytime, anywhere.",
          github: "https://shubhamshuklax.github.io/Weather-App/",
        },
        {
          id: 3,
          name: "Mud & Muse - Ceramic Website",
          status: "completed",
          freelancer: "Shivani Yadav",
          deadline: "2025-06-01",
          description: "A thoughtfully crafted e-commerce front-end for Mud & Muse — where the timeless beauty of earth and fire meets minimal design. This platform honors the essence of handmade ceramics through a serene, elegant digital experience.",
          github: "https://ishivaniyadav.github.io/Mud-and-Muse/",
        },
      ];
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className={`project-card ${project.status}`}>
            <div className="card-header">
              <h3>{project.name}</h3>
              <span className={`status-tag ${project.status}`}>{project.status}</span>
            </div>

            <p className="description">{project.description}</p>

            <div className="card-details">
              <p><strong>Freelancer:</strong> {project.freelancer}</p>
              <p><strong>Deadline:</strong> {project.deadline}</p>
            </div>

            <div className="github-link">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
