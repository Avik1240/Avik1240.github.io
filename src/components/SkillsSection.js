'use client';

import styles from './SkillsSection.module.css';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiExpress } from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: <FaHtml5 /> },
      { name: 'CSS', icon: <FaCss3Alt /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.skills}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Skills</h2>
        <div className={styles.grid}>
          {skillCategories.map((category, index) => (
            <div key={index} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.skillList}>
                {category.skills.map((skill, i) => (
                  <li key={i} className={styles.skillItem}>
                    <span className={styles.icon}>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
