"use client";

import { useState, useEffect } from "react";
import { Link, Events } from "react-scroll";
import {
  FaHome,
  FaUser,
  FaTools,
  FaCode,
  FaPhone,
  FaFile,
  FaChalkboardTeacher,
} from "react-icons/fa";
import styles from "./styles/Sidebar.module.css";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Register scroll event listeners from react-scroll
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const navLinks = [
    { to: "home", icon: <FaHome />, label: "Home" },
    { to: "about", icon: <FaUser />, label: "About" },
    { to: "skills", icon: <FaTools />, label: "Skills" },
    { to: "experience", icon: <FaChalkboardTeacher />, label: "Experience" },
    { to: "projects", icon: <FaCode />, label: "Projects" },
    { to: "contact", icon: <FaPhone />, label: "Contact" },
  ];

  return (
    <nav className={styles.sidebar}>
      <ul>
        {navLinks.map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              smooth={true}
              duration={500}
              spy={true}
              isDynamic={true}
              onSetActive={handleSetActive}
              className={activeSection === to ? styles.active : ""}
              title={label}
            >
              {icon} <span>{label}</span>
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://yourdomain.com/your-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Resume"
            className={styles.resumeLink}
          >
            <FaFile /> <span>Resume</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
