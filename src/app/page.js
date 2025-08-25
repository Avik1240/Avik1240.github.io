import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import PersonalProjectsSection from "../components/PersonalProjectsSection";
import ContactSection from "../components/ContactSection";
// import Cursor from "../components/Cursor";
import Sidebar from "../components/Sidebar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Cursor /> */}
      <Sidebar />
      <main className={styles.main}>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <PersonalProjectsSection/>
        <ContactSection />
      </main>
    </div>
  );
}
