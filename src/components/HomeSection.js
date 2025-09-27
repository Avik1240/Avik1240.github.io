"use client"; // ✅ IMPORTANT FOR FRAMER MOTION IN APP DIR

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./styles/HomeSection.module.css";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

// Custom hook for typewriter effect with reverse animation
const useTypewriter = (text, typeSpeed = 150, pauseDuration = 2000, eraseSpeed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Start typing after page loads (small delay)
    const startDelay = setTimeout(() => {
      setIsTyping(true);
      setShowCursor(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    let timeout;

    if (isTyping && currentIndex < text.length) {
      // Typing animation
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typeSpeed);
    } else if (isTyping && currentIndex === text.length && !isErasing) {
      // Pause after typing is complete
      timeout = setTimeout(() => {
        setIsTyping(false);
        setIsErasing(true);
        setCurrentIndex(text.length - 1);
      }, pauseDuration);
    } else if (isErasing && currentIndex >= 0) {
      // Erasing animation
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prev => prev - 1);
      }, eraseSpeed);
    } else if (isErasing && currentIndex < 0) {
      // Restart the cycle
      timeout = setTimeout(() => {
        setIsErasing(false);
        setIsTyping(true);
        setCurrentIndex(0);
        setDisplayText("");
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, isErasing, text, typeSpeed, eraseSpeed, pauseDuration]);

  return { displayText, showCursor, isTyping, isErasing };
};

export default function HomeSection() {
  const { displayText, showCursor, isTyping, isErasing } = useTypewriter("Avik Jain", 200, 2000, 200);

  return (
    <section id="home" className={styles.home}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.subtitle}
          >
            Frontend Developer & AI Enthusiast
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={styles.title}
          >
            Hello, I'm{" "}
            <span className={`${styles.name} ${styles.typewriter}`}>
              {displayText}
              {showCursor && (
                <span className={`${styles.cursor} ${styles.cursorBlink}`}>
                  |
                </span>
              )}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={styles.description}
          >
            Building responsive, scalable web applications with React.js and Next.js. Experienced in delivering 40+ projects with modern UI frameworks and AI-assisted development. Passionate about integrating AI tools to enhance development workflows and user experiences.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href="../../assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              <FaFileAlt /> View Resume
            </a>
          </motion.div>

          <motion.div
            className={styles.socialLinks}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href="https://github.com/Avik1240"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/avikjain1240"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}