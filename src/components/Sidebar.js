// components/Sidebar.js
"use client";

import { Link } from "react-scroll";
import {
  FaHome,
  FaUser,
  FaTools,
  FaCode,
  FaPhone,
  FaFile,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link
            to="home"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            activeClass={styles.active}
            title="Home"
          >
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link
            to="about"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            activeClass={styles.active}
            title="About"
          >
            <FaUser /> About
          </Link>
        </li>
        <li>
          <Link
            to="skills"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            activeClass={styles.active}
            title="Skills"
          >
            <FaTools /> Skills
          </Link>
        </li>
        <li>
          <Link
            to="experience"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            activeClass={styles.active}
            title="Experience"
          >
            <FaCode /> Experience
          </Link>
        </li>
        <li>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            title="Projects"
            activeClass={styles.active}
          >
            <FaCode /> Projects
          </Link>
        </li>
        <li>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            isDynamic={true}
            activeClass={styles.active}
            title="Contact"
          >
            <FaPhone /> Contact
          </Link>
        </li>
        <li>
          <a
            href="https://yourdomain.com/your-resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            title="Resume"
            className={styles.resumeLink} 
          >
            <FaFile /> Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
