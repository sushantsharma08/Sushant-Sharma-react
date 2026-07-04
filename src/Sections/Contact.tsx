import { Box } from "@mui/material";
import SectionPanel from "../components/SectionPanel";

const CONTACT_EMAIL = "sushantsharmadev@gmail.com";
const LINKS = [
  { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sushantsharmadev/" },
  { label: "GitHub", href: "https://github.com/sushantsharma08" },
];

const Contact = () => {
  return (
    <SectionPanel
      id="Contact Me"
      variant="contact"
      heading="Let's Connect"
      lead="Have a project in mind or just want to say hi? My inbox is open."
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
        {LINKS.map((link) => (
          <Box
            key={link.label}
            component="a"
            href={link.href}
            target={link.label === "Email" ? undefined : "_blank"}
            rel="noreferrer"
            className="glass contact_link"
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
        ))}
      </Box>
    </SectionPanel>
  );
};

export default Contact;
