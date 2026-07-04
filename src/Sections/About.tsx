import { Box, Typography } from "@mui/material";
import SectionPanel from "../components/SectionPanel";

const stats = [
  { value: "5+", label: "Projects Delivered", accent: "#fda4af" },
  { value: "Multiple", label: "Domains", accent: "#5eead4" },
  { value: "~ 2 Yrs", label: "Experience", accent: "#f5c842" },
];

const About = () => {
  return (
    <SectionPanel
      id="About"
      variant="about"
      heading="Overview"
      lead="A quick snapshot of what I've been building."
      
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {stats.map((item) => (
          <Box key={item.label} className="about_stat_card">
            <Typography className="about_stat_value" sx={{ color: item.accent }}>
              {item.value}
            </Typography>
            <Box className="about_stat_divider" sx={{ background: item.accent }} />
            <Typography className="about_stat_label">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </SectionPanel>
  );
};

export default About;
