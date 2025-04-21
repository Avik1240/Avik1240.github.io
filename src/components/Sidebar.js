// components/Sidebar.js

'use client';

import { Link } from 'react-scroll';
import { FaHome, FaUser, FaTools, FaCode, FaProjectDiagram, FaPhone } from 'react-icons/fa';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link to="home" smooth={true} duration={500}>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500}>
            <FaUser /> About
          </Link>
        </li>
        <li>
          <Link to="skills" smooth={true} duration={500}>
            <FaTools /> Skills
          </Link>
        </li>
        <li>
          <Link to="experience" smooth={true} duration={500}>
            <FaCode /> Experience
          </Link>
        </li>
        <li>
          <Link to="techstack" smooth={true} duration={500}>
            <FaProjectDiagram /> Tech Stack
          </Link>
        </li>
        <li>
          <Link to="projects" smooth={true} duration={500}>
            <FaCode /> Projects
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500}>
            <FaPhone /> Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
