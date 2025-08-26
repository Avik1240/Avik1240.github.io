"use client";

import styles from "./styles/PersonalProjectsSection.module.css";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaRobot,
  FaCode,
  FaDatabase,
  FaMobile,
} from "react-icons/fa";
import { useState } from "react";

const personalProjects = [
  {
    name: "Info Den",
    description:
      "Full-stack information sharing platform built with Node.js and Next.js, featuring MongoDB database integration for seamless content management and user interactions.",
    longDescription:
      "A comprehensive information sharing platform that allows users to create, share, and discover content across various categories. Built with modern full-stack architecture using Node.js backend, Next.js frontend, and MongoDB for data persistence. The platform features user authentication, content creation tools, search functionality, and responsive design. Currently developing a full version with .NET backend to enhance scalability and performance.",
    tech: ["Next.js", "Node.js", "MongoDB", "JavaScript", "CSS"],
    github: "https://github.com/Avik1240/Mini-Info-Den",
    demo: "",
    category: "Full Stack",
    aiEnhanced: true,
    featured: true,
  },
  {
    name: "NewsWala",
    description:
      "Dynamic news application built with React that delivers current events through NewsAPI integration, featuring responsive design and interactive user interface.",
    longDescription:
      "A modern news application that provides users with up-to-date news from various sources through NewsAPI integration. Features include category-wise news filtering, search functionality, article previews, and mobile-responsive design. Built with React for optimal performance and user experience, incorporating modern JavaScript practices and CSS styling for an engaging news consumption platform.",
    tech: ["React.js", "NewsAPI", "JavaScript", "CSS", "HTML"],
    github: "https://github.com/Avik1240/NewsWala",
    demo: "",
    category: "Frontend",
    aiEnhanced: true,
    featured: false,
  },
  {
    name: "TextUtils",
    description:
      "Versatile text utility application developed with React, offering comprehensive text manipulation tools including case conversion, text analysis, and formatting options.",
    longDescription:
      "A comprehensive text utility platform that provides users with various text manipulation and analysis tools. Features include uppercase/lowercase conversion, text copying, word counting, character analysis, text formatting, and search functionality. Built with React for smooth interactivity and responsive design, making it accessible across all devices for enhanced productivity and text processing needs.",
    tech: ["React.js", "JavaScript", "CSS", "HTML"],
    github: "https://github.com/Avik1240/TextUtils",
    demo: "",
    category: "Frontend",
    aiEnhanced: false,
    featured: false,
  },
  {
    name: "E-Commerce",
    description:
      "Fully responsive e-commerce website frontend featuring interactive product showcase, modern design elements, and seamless user experience built with HTML, CSS, JavaScript, and Bootstrap.",
    longDescription:
      "A complete e-commerce website frontend showcasing modern web development practices with responsive design and interactive features. The platform includes product catalogs, shopping interface, user-friendly navigation, and mobile optimization. Built using HTML for structure, CSS for styling, JavaScript for interactivity, and Bootstrap framework for responsive grid system and component library, ensuring compatibility across all devices and browsers.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "https://github.com/Avik1240/E-Commerce",
    demo: "",
    category: "Frontend",
    aiEnhanced: true,
    featured: false,
  },
  {
    name: "Flip Book",
    description:
      "Interactive PDF flip book application that transforms static documents into engaging digital experiences with realistic page-turning animations and comprehensive viewing tools.",
    longDescription:
      "An innovative PDF visualization platform that converts traditional PDF documents into interactive flip books with realistic page-turning animations. Features include zoom functionality, full-screen viewing, navigation controls, bookmark support, and mobile-responsive design. Built with JavaScript for smooth animations and interactive features, providing users with an immersive reading experience that bridges the gap between digital and physical books.",
    tech: ["JavaScript", "HTML", "CSS", "PDF.js"],
    github: "https://github.com/Avik1240/Flip--Book",
    demo: "",
    category: "Frontend",
    aiEnhanced: false,
    featured: false,
  },
];

const categories = ["All", "Full Stack", "Frontend"];

export default function PersonalProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = personalProjects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Full Stack":
        return <FaDatabase />;
      case "Frontend":
        return <FaCode />;
      case "Mobile":
        return <FaMobile />;
      default:
        return <FaCode />;
    }
  };

  return (
    <section id="personal-projects" className={styles.personalProjects}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.headingContainer}
        >
          <h2 className={styles.heading}>Personal Projects & AI Innovations</h2>
          <p className={styles.subheading}>
            Exploring cutting-edge development with AI-assisted workflows
          </p>
          {/* <h2 className={styles.heading}>Personal Projects</h2> 
          <p className={styles.subheading}>
            Showcasing full-stack and frontend development expertise
          </p>*/}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.categoryFilter}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryBtn} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.projectsGrid}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`${styles.projectCard} ${
                project.featured ? styles.featured : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.projectMeta}>
                  <span className={styles.categoryBadge}>
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                  {project.aiEnhanced && (
                    <span className={styles.aiBadge}>
                      <FaRobot />
                      AI-Enhanced
                    </span>
                  )}
                  {project.featured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                </div>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.techStack}>
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <div className={styles.projectLinks}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                        Demo
                      </a>
                    )}
                  </div>
                  <button className={styles.viewMoreBtn}>View Details →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for Project Details */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modal}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <div className={styles.modalHeader}>
                <h3>{selectedProject.name}</h3>
                <div className={styles.modalMeta}>
                  <span className={styles.categoryBadge}>
                    {getCategoryIcon(selectedProject.category)}
                    {selectedProject.category}
                  </span>
                  {selectedProject.aiEnhanced && (
                    <span className={styles.aiBadge}>
                      <FaRobot />
                      AI-Enhanced
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.modalBody}>
                <p>{selectedProject.longDescription}</p>
                <div className={styles.techStack}>
                  {selectedProject.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.modalActions}>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                    >
                      <FaGithub />
                      View Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
