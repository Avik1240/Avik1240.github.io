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
    degree: "Bachelor of Technology",
    major: "Computer Science & Engineering",
    institution: "JECRC College",
    location: "Jaipur, Rajasthan",
    duration: "2019 - 2023",
    description:
      "Comprehensive engineering program focusing on software development, algorithms, and modern web technologies with hands-on project experience and industry exposure.",
    achievements: [
      "CGPA: 9.33/10",
      "Graduated with distinction",
      "Man of the Series in Intra-College Cricket Tournament",
      "Led sports fest coordination with 750+ participants across 25+ events",
    ],
  },
  {
    degree: "Senior Secondary",
    major: "Science Stream (CBSE)",
    institution: "St. Paul's Sr. Sec. School",
    location: "Ajmer, Rajasthan",
    duration: "2017 - 2019",
    description:
      "Strong foundation in Mathematics, Physics, and Computer Science with focus on analytical thinking and problem-solving skills.",
    achievements: [
      "Grade: 90%",
      "NCC A grade certified Cadet",
      "Active participation in tech fest promotions",
      "Engaged 100+ colleges and 2,000+ attendees in national events",
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
