"use client";

import styles from "./styles/SkillsSection.module.css";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaGithub,

} from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiExpress, SiPostman } from "react-icons/si";
import {
  SiTailwindcss,
  SiBootstrap,
  SiJquery,
  SiPython,
  SiCplusplus,
  SiGitlab,
} from "react-icons/si";

const techStack = [
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React.js", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Bootstrap 5", icon: <SiBootstrap /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "jQuery", icon: <SiJquery /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "GitLab", icon: <SiGitlab /> },
  { name: "VS Code", icon: <FaJsSquare /> },
  { name: "Chrome DevTools", icon: <FaReact /> },
  { name: "Performance Optimization", icon: <FaCss3Alt /> },
  { name: "Accessibility (GIGW)", icon: <FaHtml5 /> },
  { name: "Responsive Design", icon: <FaReact /> },
  { name: "Cross-Browser Compatibility", icon: <FaJsSquare /> },
];
export default function TechStackSection() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Skills</h2>
          </div>
          <div className={styles.grid}>
            {techStack.map((tech, i) => (
              <div key={i} className={styles.card}>
                <span className={styles.icon}>{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
