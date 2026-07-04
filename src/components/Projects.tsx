import { Box, Typography } from "@mui/material";
import { useRef, type MouseEvent, type ReactNode } from "react";
import ScrollReveal from "../components/ScrollReveal";

// TODO: swap these out for your real projects
const projects = [
  {
    title: "Project One",
    description: "A one-line summary of what this project does and the problem it solves.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "Project Two",
    description: "A one-line summary of what this project does and the problem it solves.",
    tech: ["TypeScript", "Express", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Three",
    description: "A one-line summary of what this project does and the problem it solves.",
    tech: ["Python", "FastAPI", "Docker"],
    link: "#",
  },
];

const TiltCard = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -12;
    const rotateY = (x / rect.width - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
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
      className="project_template project_glass"
      sx={{ transition: "transform 0.25s ease-out" }}
    >
      {children}
    </Box>
  );
};

const Projects = () => {
  const revealImgRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", "-9999px");
          el.style.setProperty("--my", "-9999px");
        }
      }}
    >
      <Box
        ref={revealImgRef}
        className="project_spotlight"
        style={{
          width: "90%",
          minHeight: "80vh",
          backgroundColor: "rgb(0,0,0)",
          borderRadius: "20px",
          border: "2px solid rgb(189, 158, 255)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          zIndex: 6,
          padding: "20px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <ScrollReveal direction="up">
          <Box className="heading" style={{ paddingBlock: "50px" }}>
            <h1>Projects</h1>
          </Box>
        </ScrollReveal>

        <Box className="template_container" style={{ width: "100%" }}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} direction="up" delay={i * 0.12}>
              <TiltCard>
                <Box
                  className="project_template_content"
                  sx={{ flexDirection: "column", padding: "1.5rem", height: "100%" }}
                >
                  <Typography className="project_sub_Heading" sx={{ fontSize: "1.5rem !important" }}>
                    {project.title}
                  </Typography>
                  <Typography sx={{ color: "#c9c9c9", mt: 1, mb: 2 }}>{project.description}</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    {project.tech.map((t) => (
                      <Box
                        key={t}
                        sx={{
                          fontSize: "0.75rem",
                          padding: "2px 10px",
                          borderRadius: "999px",
                          border: "1px solid rgba(221,169,145,0.4)",
                          color: "#dda991",
                        }}
                      >
                        {t}
                      </Box>
                    ))}
                  </Box>
                  <Box
                    component="a"
                    href={project.link}
                    sx={{ mt: 2, color: "#a855f7", textDecoration: "none", fontWeight: 600 }}
                  >
                    View project →
                  </Box>
                </Box>
              </TiltCard>
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
