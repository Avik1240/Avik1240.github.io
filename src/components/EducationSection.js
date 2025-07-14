"use client";

import styles from "./styles/EducationSection.module.css";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaMedal,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const education = [
  {
    degree: "Master of Science",
    major: "Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    duration: "2020 - 2022",
    description:
      "Specialized in Artificial Intelligence and Machine Learning with focus on enterprise applications and cloud computing architectures.",
    achievements: [
      "GPA: 3.9/4.0",
      "Graduate Research Assistant in Cloud Computing Lab",
      "Published paper on enterprise AI systems at IEEE Conference",
      "Microsoft Research Fellowship recipient",
    ],
  },
  {
    degree: "Bachelor of Technology",
    major: "Computer Science & Engineering",
    institution: "Indian Institute of Technology",
    location: "Mumbai, India",
    duration: "2016 - 2020",
    description:
      "Comprehensive program covering software engineering, algorithms, data structures, and systems design with industry internships.",
    achievements: [
      "CGPA: 9.2/10",
      "Graduated with honors",
      "Microsoft Imagine Cup finalist",
      "Led university coding team to national championship",
    ],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className={styles.education}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Education</h2>
          </div>

          <div className={styles.educationCards}>
            {education.map((edu, index) => (
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
                      <FaGraduationCap className={styles.icon} />
                    </div>
                    <div className={styles.headerContent}>
                      <h3 className={styles.degree}>{edu.degree}</h3>
                      <h4 className={styles.major}>{edu.major}</h4>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.institutionInfo}>
                      <div className={styles.institutionName}>
                        {edu.institution}
                      </div>
                      <div className={styles.metaInfo}>
                        <div className={styles.metaItem}>
                          <FaCalendarAlt className={styles.metaIcon} />
                          <span>{edu.duration}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <FaMapMarkerAlt className={styles.metaIcon} />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className={styles.description}>{edu.description}</p>

                    <div className={styles.achievementsContainer}>
                      <h5 className={styles.achievementsHeading}>
                        <FaMedal className={styles.achievementIcon} />{" "}
                        Achievements
                      </h5>
                      <ul className={styles.achievements}>
                        {edu.achievements.map((achievement, i) => (
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
