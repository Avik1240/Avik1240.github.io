"use client"; // ✅ IMPORTANT FOR FRAMER MOTION IN APP DIR

import { motion } from "framer-motion";
import styles from "./HomeSection.module.css";

export default function HomeSection() {
  console.log("motion:", motion); // Check if this is undefined

  return (
    <section id="home" className={styles.home}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h1>
          Hello, I’m <span className={styles.name}>Avik Jain</span>
        </h1>
        <p>A passionate Full Stack Developer based in [Your City]</p>
      </motion.div>
    </section>
  );
}
