'use client';

import styles from './ExperienceSection.module.css';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    duration: '2021 - Present',
    description: 'Building scalable web applications using Node.js, Next.js, and MongoDB. Led a team of developers and handled full project lifecycle.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Creative Coders',
    duration: '2017 - 2021',
    description: 'Worked on frontend and backend with React, Express, and MongoDB. Focused on building reusable components and clean APIs.',
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    duration: '2013 - 2017',
    description: 'Developed websites for small businesses and startups. Gained strong foundation in JavaScript and UI/UX principles.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.experience}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.marker} />
              <div className={styles.details}>
                <h3 className={styles.role}>{exp.role}</h3>
                <p className={styles.company}>{exp.company} — <span>{exp.duration}</span></p>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
