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
    role: "Software Developer - Web",
    company: "Silver Touch Technologies Ltd",
    location: "Ahmedabad, Gujarat",
    duration: "Jan 2024 - Present",
    description:
      "Developing enterprise-grade web applications using React.js, Next.js, and modern UI frameworks. Specializing in HRMS platforms, government portals, and AI-assisted development workflows for enhanced productivity and code quality.",
    achievements: [
      "Built comprehensive HRMS product using Next.js and Tailwind CSS with modular architecture",
      "Developed accessible frontends for MyGov Maharashtra Portal ensuring WCAG compliance",
      "Delivered modern UIs for BSPHCL, Bower Wealth, and Namo Drone Didi platforms",
      "Leveraged ChatGPT and AI tools to accelerate component development and debugging processes",
    ],
  },
  {
    role: "Research & Development Intern",
    company: "Nestlé",
    location: "Gurgaon, Haryana",
    duration: "Dec 2021 - Jan 2022",
    description:
      "Collaborated on innovative automation solutions for coffee packaging operations. Researched and designed cost-effective end-of-line packaging systems for Stabilo line in coffee F&P division, focusing on efficiency optimization.",
    achievements: [
      "Identified automated filling and packaging solution reducing manual intervention",
      "Contributed to significant time savings per week through process optimization",
      "Researched low-cost automation technologies for industrial applications",
      "Collaborated with cross-functional teams on packaging innovation projects",
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
