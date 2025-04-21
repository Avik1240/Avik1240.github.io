"use client";

import styles from "./TechStackSection.module.css";
import { motion } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
    FaGitAlt,
    FaGithub,
  } from 'react-icons/fa';
  import {
    SiNextdotjs,
    SiMongodb,
    SiExpress,
    SiPostman,
  } from 'react-icons/si';
  

const techStack = [
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express.js", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "Postman", icon: <SiPostman /> },
];

export default function TechStackSection() {
  return (
    <section id="techstack" className={styles.techstack}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Tech Stack</h2>
        <div className={styles.grid}>
          {techStack.map((tech, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{tech.icon}</span>
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
