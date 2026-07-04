
import { Box, Typography } from "@mui/material";
import SectionPanel from "../components/SectionPanel";

const experiences = [
  {
    role: "System Engineer",
    company: "Tata Consultancy Services (TCS)",
    period: "Feb 2025 – Present",
    year: "2025",
    accent: "#f5c842",
    current: true,
  },
  {
    role: "Software Engineer Intern",
    company: "Amantya Technologies",
    period: "Jun – Aug 2024",
    year: "2024",
    accent: "#5eead4",
    current: false,
  },
];

export default function Experience() {
  return (
    <SectionPanel
      id="Experience"
      variant="experience"
      heading="Experience"
      lead="My professional journey — most recent first."
      contentClassName="experience_section"
    >
      <Box className="exp-timeline" component="ol">
        <Box className="exp-spine" aria-hidden="true">
          <Box className="exp-spine-line" />
          <Box className="exp-spine-pulse" />
        </Box>

        {experiences.map((job, index) => {
          const side = index % 2 === 0 ? "left" : "right";
          const isLast = index === experiences.length - 1;

          return (
            <Box
              key={job.role}
              component="li"
              className={`exp-item exp-item--${side}${job.current ? " exp-item--current" : ""}${isLast ? " exp-item--last" : ""}`}
            >
              <Box className="exp-card-col">
                <Box
                  className="exp-card"
                  sx={{
                    "--exp-accent": job.accent,
                    borderColor: `${job.accent}44`,
                  }}
                >
                  {job.current && <span className="exp-badge">Current</span>}
                  <Typography className="exp-period" sx={{ color: job.accent }}>
                    {job.period}
                  </Typography>
                  <Typography className="exp-role">{job.role}</Typography>
                  <Typography className="exp-company">{job.company}</Typography>
                </Box>
              </Box>

              <Box className="exp-axis" aria-hidden="true">
                <Box className={`exp-connector exp-connector--${side}`} />
                <Box
                  className={`exp-dot${job.current ? " exp-dot--live" : ""}`}
                  sx={{
                    borderColor: job.accent,
                    boxShadow: `0 0 0 4px ${job.accent}22, 0 0 18px ${job.accent}66`,
                  }}
                >
                  <Box className="exp-dot-core" sx={{ background: job.accent }} />
                </Box>
                <Typography className="exp-year" sx={{ color: job.accent }}>
                  {job.year}
                </Typography>
              </Box>

              <Box className="exp-spacer" aria-hidden="true" />
            </Box>
          );
        })}
      </Box>
    </SectionPanel>
  );
}
