"use client";

import styles from "./styles/AboutSection.module.css";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>About Me</h2>
        <p className={styles.text}>
          I’m a full-stack developer with over 10 years of experience working
          with Node.js, Next.js, and MongoDB. I love building modern,
          performant, and elegant web applications with a focus on clean UX and
          scalable backend.
        </p>
      </motion.div>
    </section>
  );
}
