"use client";

import styles from "./styles/PersonalProjectsSection.module.css";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaRobot, FaCode, FaDatabase, FaMobile } from "react-icons/fa";
import { useState } from "react";

const personalProjects = [
  {
    name: "AI-Enhanced E-commerce Platform",
    description:
      "Full-stack e-commerce application built with AI-assisted development workflows. Leveraged ChatGPT for rapid component generation and Claude for architecture optimization.",
    longDescription:
      "A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built entirely using AI-assisted development methodologies for accelerated coding and intelligent debugging processes.",
    tech: ["React.js", "Node.js", "MongoDB", "Stripe API", "ChatGPT Integration"],
    github: "https://github.com/avik-jain/ai-ecommerce",
    demo: "https://ai-ecommerce-demo.vercel.app",
    category: "Full Stack",
    aiEnhanced: true,
    featured: true,
  },
  {
    name: "Smart Task Management App",
    description:
      "Personal productivity application with AI-powered task prioritization and intelligent scheduling suggestions built using prompt engineering techniques.",
    longDescription:
      "A modern task management solution that uses AI algorithms to suggest optimal task scheduling, priority levels, and deadline management. Developed with extensive AI assistance for component architecture and state management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI Integration"],
    github: "https://github.com/avik-jain/smart-tasks",
    demo: "https://smart-tasks-demo.vercel.app",
    category: "Frontend",
    aiEnhanced: true,
    featured: true,
  },
  {
    name: "Social Media Dashboard",
    description:
      "Analytics dashboard for social media management with real-time data visualization. Built using AI-assisted coding for rapid development and optimization.",
    longDescription:
      "Comprehensive social media analytics platform featuring real-time data visualization, engagement metrics, and content performance tracking. Utilized AI tools for efficient component development and debugging workflows.",
    tech: ["React.js", "D3.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/avik-jain/social-dashboard",
    demo: "",
    category: "Full Stack",
    aiEnhanced: true,
    featured: false,
  },
  {
    name: "Weather Prediction App",
    description:
      "Mobile-responsive weather application with advanced forecasting features. Developed using AI-enhanced development practices for faster iteration.",
    longDescription:
      "Modern weather application featuring location-based forecasting, interactive maps, and weather alerts. Built with mobile-first approach using AI-assisted development for component optimization and responsive design implementation.",
    tech: ["React.js", "Weather API", "Tailwind CSS", "PWA"],
    github: "https://github.com/avik-jain/weather-app",
    demo: "https://weather-app-demo.vercel.app",
    category: "Frontend",
    aiEnhanced: true,
    featured: false,
  },
  {
    name: "Portfolio CMS",
    description:
      "Content management system for portfolio websites with drag-and-drop functionality. Created with AI guidance for architecture and component design.",
    longDescription:
      "A flexible CMS solution specifically designed for portfolio websites featuring drag-and-drop page builder, content management, and SEO optimization. Developed using AI-assisted workflows for rapid prototyping and feature implementation.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Drag & Drop"],
    github: "https://github.com/avik-jain/portfolio-cms",
    demo: "",
    category: "Full Stack",
    aiEnhanced: true,
    featured: true,
  },
  {
    name: "Code Snippet Manager",
    description:
      "Developer tool for organizing and sharing code snippets with syntax highlighting. Built using AI-enhanced development methodologies.",
    longDescription:
      "Comprehensive code snippet management platform with syntax highlighting, categorization, and sharing capabilities. Developed with AI assistance for efficient development cycles and intelligent code organization features.",
    tech: ["React.js", "Firebase", "Monaco Editor", "Material UI"],
    github: "https://github.com/avik-jain/snippet-manager",
    demo: "https://snippet-manager-demo.vercel.app",
    category: "Frontend",
    aiEnhanced: true,
    featured: false,
  },
];

const categories = ["All", "Full Stack", "Frontend"];

export default function PersonalProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = personalProjects.filter(
    project => activeCategory === "All" || project.category === activeCategory
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Full Stack": return <FaDatabase />;
      case "Frontend": return <FaCode />;
      case "Mobile": return <FaMobile />;
      default: return <FaCode />;
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
                <p className={styles.projectDescription}>{project.description}</p>
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
                  <button className={styles.viewMoreBtn}>
                    View Details →
                  </button>
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