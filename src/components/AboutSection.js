"use client";

import styles from "./styles/AboutSection.module.css";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaLaptopCode } from "react-icons/fa";

export default function AboutSection() {
  const specializations = [
    {
      icon: <FaCode />,
      title: "React & Next.js Expert",
      description:
        "Crafting lightning-fast, responsive web applications with component-driven architecture and modern React patterns",
    },
    {
      icon: <FaServer />,
      title: "AI-Powered Development",
      description:
        "Pioneering AI-assisted coding workflows using ChatGPT and Claude for rapid prototyping and intelligent debugging",
    },
    {
      icon: <FaDatabase />,
      title: "UI/UX Excellence",
      description:
        "Delivering pixel-perfect, accessible interfaces with Tailwind CSS, focusing on performance and user experience",
    },
    {
      icon: <FaLaptopCode />,
      title: "Enterprise Solutions",
      description:
        "Building scalable HRMS platforms and government portals with emphasis on security, WCAG compliance, and maintainability",
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
                I'm a passionate Frontend Developer with 1.5+ years of hands-on
                experience crafting exceptional web experiences using React.js
                and Next.js. My journey spans across 40+ diverse projects, where
                I've mastered the art of building responsive, scalable
                applications with modern UI frameworks like Tailwind CSS and
                Bootstrap 5.
              </p>
              <p className={styles.text}>
                What sets me apart is my innovative approach to development
                through AI integration. I leverage prompt engineering and
                generative AI tools like ChatGPT and Claude to accelerate
                development cycles, enhance code quality, and pioneer
                cutting-edge solutions. Currently transitioning into GenAI, I'm
                at the forefront of revolutionizing how we build tomorrow's web
                applications.
              </p>
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>40+</span>
                  <span className={styles.keyPointLabel}>
                    Projects Delivered
                  </span>
                </div>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>1.5+</span>
                  <span className={styles.keyPointLabel}>Years Experience</span>
                </div>
                <div className={styles.keyPoint}>
                  <span className={styles.keyPointNumber}>5+</span>
                  <span className={styles.keyPointLabel}>
                    Enterprise Solutions
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
