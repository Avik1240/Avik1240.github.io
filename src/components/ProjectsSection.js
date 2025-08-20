"use client";

import styles from "./styles/ProjectsSection.module.css";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projects = [
  {
    name: "Enterprise Cloud Platform",
    description:
      "Scalable cloud infrastructure management platform for Fortune 500 companies with real-time monitoring and automated resource allocation.",
    tech: ["React", "Node.js", "AWS", "Kubernetes"],
    github: "https://github.com/your-username/cloud-platform",
    demo: "https://enterprise-cloud.example.com",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "Financial Analytics Dashboard",
    description:
      "Real-time financial data visualization platform used by investment banks for market analysis and portfolio management.",
    tech: ["Angular", "D3.js", "Python", "MongoDB"],
    github: "https://github.com/your-username/finance-analytics",
    demo: "",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "Healthcare Management System",
    description:
      "HIPAA-compliant patient management system with electronic health records, appointment scheduling, and billing integration.",
    tech: ["React", "Express", "PostgreSQL", "Docker"],
    github: "https://github.com/your-username/healthcare-system",
    demo: "",
    image: "https://via.placeholder.com/500x300",
    featured: false,
  },
  {
    name: "E-commerce Platform",
    description:
      "Enterprise-grade e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    tech: ["Next.js", "GraphQL", "Stripe", "Redis"],
    github: "https://github.com/your-username/ecommerce-platform",
    demo: "https://ecommerce-demo.example.com",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "Supply Chain Management",
    description:
      "Blockchain-based supply chain tracking system for enterprise logistics with real-time inventory and shipment monitoring.",
    tech: ["Hyperledger", "React", "Node.js", "AWS"],
    github: "https://github.com/your-username/supply-chain",
    demo: "",
    image: "https://via.placeholder.com/500x300",
    featured: false,
  },
  {
    name: "AI-Powered CRM",
    description:
      "Customer relationship management system with machine learning for lead scoring, sentiment analysis, and sales forecasting.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    github: "https://github.com/your-username/ai-crm",
    demo: "",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.headingContainer}
        >
          <h2 className={styles.heading}>Featured Projects</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.swiperContainer}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={44}
            grabCursor={true}
            navigation={true}
            speed={1000}
            keyboard={{ enabled: true }}
            observer={true}
            observeParents={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            // autoplay={{
            //   delay: 4000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            loop={true}
            className={styles.swiper}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 44,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 44,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 44,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 44,
              },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.projectCard}>
                  <div className={styles.projectImageContainer}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className={styles.projectImage}
                    />
                    {project.featured && (
                      <div className={styles.featuredBadge}>Featured</div>
                    )}
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        <h3 className={styles.overlayTitle}>{project.name}</h3>
                        <div className={styles.overlayLinks}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.overlayLink}
                              aria-label="View code on GitHub"
                            >
                              <FaGithub />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.overlayLink}
                              aria-label="View live demo"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.name}</h3>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>
                    <div className={styles.techStack}>
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={styles.projectLinks}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          aria-label="View code on GitHub"
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          aria-label="View live demo"
                        >
                          <FaExternalLinkAlt /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
