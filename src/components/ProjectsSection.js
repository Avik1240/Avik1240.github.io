'use client';

import styles from './ProjectsSection.module.css';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    name: 'Portfolio Website',
    description: 'My personal portfolio built with Next.js and Framer Motion with a fully dark themed UI.',
    tech: ['Next.js', 'CSS Modules', 'Framer Motion'],
    github: 'https://github.com/your-username/portfolio',
    demo: 'https://your-portfolio.vercel.app',
  },
  {
    name: 'Book Store App',
    description: 'A full-stack MERN bookstore with admin, vendor, and user dashboards. Features include cart, order tracking, and authentication.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/your-username/bookstore',
    demo: '',
  },
  {
    name: 'WhatsApp Link Generator',
    description: 'Clone of create.wa.link – allows generating WhatsApp contact links with custom messages.',
    tech: ['Next.js', 'MongoDB', 'API Routes'],
    github: 'https://github.com/your-username/wa-link-generator',
    demo: '',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <div key={idx} className={styles.card}>
              <h3 className={styles.title}>{project.name}</h3>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.tech}>
                {project.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
              <div className={styles.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
