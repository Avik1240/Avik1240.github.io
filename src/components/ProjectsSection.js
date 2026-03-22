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
    name: "Ministry of External Affairs (MEA) Portal",
    description:
      "Led frontend revamp, building scalable and accessible UI with CMS integration. Focused on performance optimization, cross-browser compatibility, and GIGW compliance.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery", ".Net"],
    demo: "https://165.99.205.19/MEACore",
    image: "../../assets/images/ministry-of-external-affairs-preview.png",
    featured: true,
    underDev: true,
  },
  {
    name: "Ministry of Railways (Railway Board)",
    description:
      "Contributed to UI modernization of a large-scale government platform. Improved responsiveness, usability, and cross-browser compatibility.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery", "Java"],
    demo: "https://203.176.113.181/RB/",
    image: "../../assets/images/ministry-of-railways-preview.png",
    featured: true,
    underDev: true,
  },
  {
    name: "MyGov Maharashtra Portal",
    description:
      "Built responsive UI components for a high-traffic citizen platform with focus on scalability and accessibility.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery"],
    demo: "https://mygovmaharashtra.mahaonline.gov.in/",
    image: "../../assets/images/mygov-mah-preview.png",
    featured: true,
  },
  {
    name: "BSPHCL Portal",
    description:
      "Developed and maintained responsive interfaces with focus on usability and cross-browser support.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery"],
    // github: "https://github.com/avik-jain/bsphcl-dashboard",
    demo: "http://hrmspension.bsphcl.co.in:9010/",
    image: "../../assets/images/bsphcl-preview.png",
    featured: true,
  },
  {
    name: "Bower Wealth / Private Clients",
    description:
      "Delivered premium, responsive UI for financial platforms with performance optimization.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery", "Wordpress"],
    // github: "https://github.com/avik-jain/bower-wealth",
    demo: "https://www.bowerhomefinance.co.uk/private-clients/",
    image: "../../assets/images/bower-private-preview.png",
    featured: true,
  },
  {
    name: "Bower Wealth Platform",
    description:
      "Delivered premium, responsive UI for financial platforms with performance optimization.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery", "Wordpress"],
    // github: "https://github.com/avik-jain/bower-wealth",
    demo: "https://www.bowerwealth.co.uk/",
    image: "../../assets/images/bower-wealth-preview.png",
    featured: true,
  },
  {
    name: "Namo Drone Didi Platform",
    description:
      "Built accessible and mobile-friendly government portal ensuring smooth user experience.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "jQuery"],
    // github: "https://github.com/avik-jain/namo-drone-didi",
    demo: "https://namodronedidi.da.gov.in/",
    image: "../../assets/images/ndd-preview.png",
    featured: false,
  },
  {
    name: "HRMS (Next.js)",
    description:
      "Developed reusable components and improved frontend architecture using Next.js and Tailwind CSS. Enhanced performance and user workflows.",
    tech: ["Next.js", "Tailwind CSS", "React", "JavaScript"],
    // github: "https://github.com/avik-jain/hrms-platform",
    demo: false,
    image: "../../assets/images/no-preview.png",
    featured: true,
    underDev: true,
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
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
                    {project.underDev && (
                      <div className={styles.underDevBadge}>Under Development</div>
                    )}
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        {/* <h3 className={styles.overlayTitle}>{project.name}</h3> */}
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
