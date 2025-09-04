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
    name: "HRMS Enterprise Platform",
    description:
      "Comprehensive Human Resource Management System built with Next.js and Tailwind CSS featuring modular component architecture, employee management, and performance analytics.",
    tech: ["Next.js", "Tailwind CSS", "React Hooks", "Context API"],
    // github: "https://github.com/avik-jain/hrms-platform",
    demo: "https://github.com/avik-jain/namo-drone-didi",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "MyGov Maharashtra Portal",
    description:
      "Accessible government portal frontend ensuring WCAG compliance with responsive design. Built for citizen services with cross-browser compatibility and mobile-first approach.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery"],
    // github: "https://github.com/avik-jain/mygov-portal",
    demo: "https://mygovmaharashtra.mahaonline.gov.in/",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "BSPHCL Enterprise Dashboard",
    description:
      "Modern UI dashboard for Bihar State Power Holding Company with optimized performance, clean architecture, and enhanced user experience through performance tuning.",
    tech: ["React.js", "Tailwind CSS", "Performance Optimization"],
    // github: "https://github.com/avik-jain/bsphcl-dashboard",
    demo: "http://hrmspension.bsphcl.co.in:9010/",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "Bower Private Clients",
    description:
      "Financial services platform with responsive design and modern UI components. Focus on user experience optimization and scalable component architecture.",
    tech: ["React.js", "CSS3", "Component Architecture"],
    // github: "https://github.com/avik-jain/bower-wealth",
    demo: "https://www.bowerhomefinance.co.uk/private-clients/",
    image: "https://via.placeholder.com/500x300",
    featured: false,
  },
  {
    name: "Bower Wealth Platform",
    description:
      "Financial services platform with responsive design and modern UI components. Focus on user experience optimization and scalable component architecture.",
    tech: ["React.js", "CSS3", "Component Architecture"],
    // github: "https://github.com/avik-jain/bower-wealth",
    demo: "https://www.bowerwealth.co.uk/",
    image: "https://via.placeholder.com/500x300",
    featured: false,
  },
  {
    name: "Namo Drone Didi Platform",
    description:
      "Government initiative platform for drone technology empowerment with modern UI design, improved load times, and user-centric interface development.",
    tech: ["React.js", "Modern UI", "Performance Optimization"],
    // github: "https://github.com/avik-jain/namo-drone-didi",
    demo: "https://namodronedidi.da.gov.in/",
    image: "https://via.placeholder.com/500x300",
    featured: true,
  },
  {
    name: "AI-Assisted Development Suite",
    description:
      "Personal development toolkit leveraging ChatGPT and Claude for rapid component generation, intelligent debugging, and code optimization. Pioneering AI-integrated workflows.",
    tech: ["ChatGPT API", "Claude AI", "React.js", "Prompt Engineering"],
    // github: "https://github.com/avik-jain/ai-dev-suite",
    demo: "https://github.com/avik-jain/namo-drone-didi",
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
                          {/* {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.overlayLink}
                              aria-label="View code on GitHub"
                            >
                              <FaGithub />
                            </a>
                          )} */}
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
                    {/* <div className={styles.projectLinks}>
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
                    </div> */}
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
