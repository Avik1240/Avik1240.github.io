"use client";

import styles from "./styles/AboutSection.module.css";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaLaptopCode } from "react-icons/fa";

export default function AboutSection() {
  const specializations = [
    {
      icon: <FaCode />,
      title: "Frontend Development",
      description:
        "Building responsive, accessible, and performant user interfaces with React and Next.js",
    },
    {
      icon: <FaServer />,
      title: "Backend Engineering",
      description:
        "Developing robust APIs and services with Node.js, Express, and cloud technologies",
    },
    {
      icon: <FaDatabase />,
      title: "Database Design",
      description:
        "Creating efficient data models and implementing solutions with SQL and NoSQL databases",
    },
    {
      icon: <FaLaptopCode />,
      title: "Enterprise Solutions",
      description:
        "Delivering scalable applications with focus on security, performance, and maintainability",
    },
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>About Me</h2>
          </div>

          <div className={styles.aboutContent}>
            <motion.div
              className={styles.bioSection}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.bioHeading}>Professional Background</h3>
              <p className={styles.text}>
                I'm a full-stack developer with over 10 years of experience
                specializing in enterprise-grade web applications. My expertise
                spans the entire development lifecycle, from architecture and
                design to implementation and deployment.
              </p>
              <p className={styles.text}>
                I've collaborated with cross-functional teams at leading
                technology companies to deliver scalable, maintainable solutions
                that solve complex business problems. My approach combines
                technical excellence with a deep understanding of business
                requirements.
              </p>
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>10+</span>
                  <span className={styles.keyPointLabel}>Years Experience</span>
                </div>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>50+</span>
                  <span className={styles.keyPointLabel}>
                    Projects Completed
                  </span>
                </div>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>15+</span>
                  <span className={styles.keyPointLabel}>
                    Enterprise Clients
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.specializationsSection}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.specializationsHeading}>Specializations</h3>
              <div className={styles.specializationsGrid}>
                {specializations.map((item, index) => (
                  <motion.div
                    key={index}
                    className={styles.specializationCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.specializationIcon}>{item.icon}</div>
                    <h4 className={styles.specializationTitle}>{item.title}</h4>
                    <p className={styles.specializationDescription}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
