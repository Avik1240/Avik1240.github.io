'use client';

import styles from './ContactSection.module.css';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

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
          <p>If you would like to get in touch, feel free to drop me a message or connect with me on my socials!</p>
          <div className={styles.socials}>
            <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope /> Email
            </a>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        <form className={styles.form}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Your Text" required />
          <button type="submit">Send Message</button>
        </form>
      </motion.div>
    </section>
  );
}
