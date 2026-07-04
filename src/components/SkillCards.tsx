import { Box, Typography } from "@mui/material";

const skills = [
  { title: "Frontend", items: ["React", "TypeScript", "Three.js"] },
  { title: "Backend", items: ["Node.js", "Express"] },
  { title: "AI", items: ["LLMs", "LangChain"] },
  { title: "IoT", items: ["ESP32"] },
  { title: "Database", items: ["MongoDB"] },
];

export default function SkillsTree() {
  return (
    <Box className="skills_panel">
      <Box className="skills_list">
        {skills.map((group) => (
          <Box key={group.title} className="skills_row">
            <Typography component="span" className="skills_category">
              {group.title}
            </Typography>
            <Typography component="span" className="skills_items">
              {group.items.join("  ·  ")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
