"use client";

import styles from "./styles/ContactSection.module.css";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Contact Me</h2>
        <div className={styles.details}>
          <p>
            Ready to collaborate on your next project? Let's discuss how my
            expertise in React.js, Next.js, and AI-assisted development can
            bring your ideas to life. I'm always excited to work on innovative
            web solutions!
          </p>
          <div className={styles.socials}>
            <a
              href="mailto:your.email@example.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Email"
              className={styles.card}
            >
              <span className={styles.icon}>
                <FaEnvelope />
              </span>
              Email
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              className={styles.card}
            >
              <span className={styles.icon}>
                <FaGithub />
              </span>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className={styles.card}
            >
              <span className={styles.icon}>
                <FaLinkedin />
              </span>
              LinkedIn
            </a>
            <a
              href="https://www.twitter.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className={styles.card}
            >
              <span className={styles.icon}>
                <FaXTwitter />
              </span>
              X
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
