import { Box, Typography } from "@mui/material";
import ScrollReveal from "../components/ScrollReveal";

// TODO: replace with your real details/links
const CONTACT_EMAIL = "your.email@example.com";
const LINKS = [
  { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
  { label: "GitHub", href: "https://github.com/your-handle" },
];

const Contact = () => {
  return (
    <Box className="individual_sections" id="Contact Me">
      <ScrollReveal direction="up">
        <Box className="heading">
          <h1>Contact Me</h1>
        </Box>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <Typography sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, mx: "auto", mb: 4 }}>
          Have a project in mind or just want to say hi? My inbox is open.
        </Typography>
      </ScrollReveal>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
        {LINKS.map((link, i) => (
          <ScrollReveal key={link.label} direction="up" delay={0.2 + i * 0.1}>
            <Box
              component="a"
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noreferrer"
              className="glass"
              sx={{
                display: "inline-block",
                padding: "12px 28px",
                borderRadius: "999px",
                color: "#dda991",
                textDecoration: "none",
                fontWeight: 600,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(168,85,247,0.25)",
                },
              }}
            >
              {link.label}
            </Box>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
};

export default Contact;
