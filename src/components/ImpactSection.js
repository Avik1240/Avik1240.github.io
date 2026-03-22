"use client";

import styles from "./styles/ImpactSection.module.css";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const impactPoints = [
    "Led frontend revamp of MEA website",
    "Delivered UI solutions across multiple government platforms",
    "Improved accessibility (GIGW) and performance",
    "Built reusable component-based systems",
];

export default function ImpactSection() {
    return (
        <section id="impact" className={styles.impact}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.headingContainer}>
                        <h2 className={styles.heading}>Impact</h2>
                    </div>

                    <motion.div
                        className={styles.impactList}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {impactPoints.map((point, index) => (
                            <motion.div
                                key={index}
                                className={styles.impactItem}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                viewport={{ once: true }}
                            >
                                <FaCheckCircle className={styles.icon} />
                                <span className={styles.text}>{point}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
