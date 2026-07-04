import { Box, Typography } from "@mui/material";
import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from "react";
import SectionPanel from "../components/SectionPanel";

const projects = [
  {
    title: "E Money-Lender",
    description:
      "A full-stack application that solves a real-world problem of maintaining records for money lenders with clean architecture and modern tooling.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://e-money-lender.vercel.app/auth_login",
    accent: "#a855f7",
  },
  {
    title: "Hive Automations",
    description:
      "This home automation project integrates IoT hardware and software to provide seamless, remote control of household devices. It enhances convenience and efficiency, allowing users to manage their home environment effortlessly from anywhere.",
    tech: ["React", "ESP-32","Node.js"],
    link: "https://hiveautomations.vercel.app/",
    accent: "#22d3ee",
  },
  // {
  //   title: "Project Three",
  //   description:
  //     "Containerized services with automated pipelines — designed for reliability in production environments.",
  //   tech: ["Python", "FastAPI", "Docker"],
  //   link: "#",
  //   accent: "#ec4899",
  // },
];

const TiltCard = ({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <Box
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="project_card"
      sx={{
        "--card-accent": accent,
        transition: "transform 0.25s ease-out",
      } as CSSProperties}
    >
      {children}
    </Box>
  );
};

const Projects = () => {
  const revealImgRef = useRef<HTMLDivElement | null>(null);

  return (
    <SectionPanel
      id="Projects"
      variant="projects"
      heading="Selected Work"
      lead="Selected work across frontend, backend, and full-stack engineering."
      className="projects_section"
      contentClassName="projects_inner"
    >
      <Box
        ref={revealImgRef}
        className="projects_panel project_spotlight"
        onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          revealImgRef.current?.style.setProperty("--mx", `${x}px`);
          revealImgRef.current?.style.setProperty("--my", `${y}px`);
        }}
        onMouseLeave={() => {
          revealImgRef.current?.style.setProperty("--mx", "-9999px");
          revealImgRef.current?.style.setProperty("--my", "-9999px");
        }}
        sx={{ width: "100%" }}
      >
        <Box className="projects_grid">
          {projects.map((project) => (
            <TiltCard key={project.title} accent={project.accent}>
              <Box className="project_card_inner">
                <Box className="project_card_accent_bar" sx={{ background: project.accent }} />
                <Typography className="project_card_title">{project.title}</Typography>
                <Typography className="project_card_desc">{project.description}</Typography>
                <Box className="project_card_tags">
                  {project.tech.map((t) => (
                    <span key={t} className="project_tag">
                      {t}
                    </span>
                  ))}
                </Box>
                <Box
                  component="a"
                  href={project.link}
                  className="project_card_link"
                  sx={{ color: project.accent }}
                >
                  View project →
                </Box>
              </Box>
            </TiltCard>
          ))}
        </Box>
      </Box>
    </SectionPanel>
  );
};

export default Projects;
