"use client";

import styles from "./styles/ExperienceSection.module.css";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";

const experiences = [
  {
    role: "Senior Software Architect",
    company: "Microsoft",
    location: "Redmond, WA",
    duration: "2021 - Present",
    description:
      "Leading architecture design for enterprise cloud solutions using Azure, .NET Core, and React. Managing a team of 12 developers across multiple projects and implementing CI/CD pipelines for seamless deployment.",
    achievements: [
      "Reduced system latency by 40% through microservices architecture redesign",
      "Implemented secure authentication system for enterprise clients",
      "Led migration of legacy systems to cloud infrastructure",
      "Mentored junior developers and conducted technical workshops",
    ],
  },
  {
    role: "Lead Full Stack Developer",
    company: "Amazon Web Services",
    location: "Seattle, WA",
    duration: "2018 - 2021",
    description:
      "Developed scalable web applications using Node.js, React, and AWS services. Collaborated with product managers and designers to deliver high-quality user experiences for enterprise clients.",
    achievements: [
      "Built real-time analytics dashboard used by 500+ enterprise customers",
      "Optimized database queries resulting in 60% performance improvement",
      "Implemented automated testing framework reducing bugs by 35%",
      "Received AWS Innovation Award for developer tools contribution",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Google",
    location: "Mountain View, CA",
    duration: "2016 - 2018",
    description:
      "Worked on Google Cloud Platform interfaces using Angular and Material Design. Focused on creating responsive, accessible, and performant user interfaces for enterprise customers.",
    achievements: [
      "Developed component library used across multiple Google Cloud products",
      "Improved accessibility compliance to WCAG 2.1 AA standards",
      "Reduced bundle size by 30% through code splitting and lazy loading",
      "Contributed to open-source Material Design components",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Professional Experience</h2>
          </div>

          <div className={styles.experienceCards}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconContainer}>
                      <FaBriefcase className={styles.icon} />
                    </div>
                    <div className={styles.headerContent}>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <div className={styles.companyInfo}>
                        <FaBuilding className={styles.companyIcon} />
                        <span className={styles.company}>{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.metaInfo}>
                      <div className={styles.metaItem}>
                        <FaCalendarAlt className={styles.metaIcon} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.location}>{exp.location}</span>
                      </div>
                    </div>

                    <p className={styles.description}>{exp.description}</p>

                    <div className={styles.achievementsContainer}>
                      <h5 className={styles.achievementsHeading}>
                        <FaTasks className={styles.achievementIcon} /> Key
                        Achievements
                      </h5>
                      <ul className={styles.achievements}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className={styles.achievementItem}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
