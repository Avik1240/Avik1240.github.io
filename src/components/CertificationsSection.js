"use client";

import styles from "./styles/CertificationsSection.module.css";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const certifications = [
    {
        title: "AI Fluency: Framework & Foundations",
        link: "http://verify.skilljar.com/c/eew4jbrh2o7b",
    },
    {
        title: "Claude 101",
        link: "http://verify.skilljar.com/c/5cdbgehiyxje",
    },
    {
        title: "Claude Code in Action",
        link: "http://verify.skilljar.com/c/eakssz7biyj5",
    },
];

export default function CertificationsSection() {
    return (
        <section id="certifications" className={styles.certifications}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.headingContainer}>
                        <h2 className={styles.heading}>Certifications</h2>
                    </div>

                    <div className={styles.certGrid}>
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className={styles.certCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.iconContainer}>
                                    <FaCertificate className={styles.icon} />
                                </div>
                                <h3 className={styles.certTitle}>{cert.title}</h3>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.certLink}
                                >
                                    View Certificate
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
