import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const skills = [
  { title: "Frontend", items: ["React", "TypeScript", "Three.js"] },
  { title: "Backend", items: ["Node.js", "Express"] },
  { title: "AI", items: ["LLMs", "LangChain"] },
  { title: "IoT", items: ["ESP32"] },
  { title: "DB", items: ["MongoDB"] }
];

export default function SkillsTree() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "auto",
        color: "white",
        px: 3,
        py: 6
      }}
    >
      {/* HEADING */}
      <Typography
        sx={{
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: 800,
          mb: 6,
          letterSpacing: "6px"
        }}
      >
        SKILLS
      </Typography>

      {/* TREE CONTAINER */}
      <Box sx={{ position: "relative", pl: 4 }}>

        {/* MAIN VERTICAL LINE */}
        <Box
          sx={{
            position: "absolute",
            left: "6px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "rgba(255,255,255,0.15)"
          }}
        />

        {skills.map((cat, i) => {
          const isActive = active === i;

          return (
            <Box key={i} sx={{ mb: 5, position: "relative" }}>

              {/* CATEGORY CONNECTOR */}
              <Box
                sx={{
                  position: "absolute",
                  left: "7px",   // 👈 shift by +1px
                  top: "16px",
                  width: "16px",
                  height: "1px",
                  background: "rgba(255,255,255,0.3)"
                }}
              />

              {/* CATEGORY TEXT */}
              <Typography
                onClick={() => setActive(isActive ? null : i)}
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: isActive ? 1 : 0.6,
                  transition: "0.3s",
                  "&:hover": {
                    opacity: 1
                  },
                  textAlign:"left"
                }}
              >
                {cat.title}
              </Typography>

              {/* CHILDREN */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Box sx={{ mt: 1, ml: 2, position: "relative" }}>

                      {/* CHILD VERTICAL LINE */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: "6px",
                          top: 0,
                          bottom: 0,
                          width: "1px",
                          background: "rgba(255,255,255,0.15)",
                          
                        }}
                      />

                      {cat.items.map((item, j) => {
                        const isLast = j === cat.items.length - 1;

                        return (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                          >
                            <Box
                              sx={{
                                position: "relative",
                                pl: 3,
                                mb: 1
                              }}
                            >

                              {/* HORIZONTAL LINE */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  left: "6px",
                                  top: "10px",
                                  width: "12px",
                                  height: "1px",
                                  background: "rgba(255,255,255,0.2)"
                                }}
                              />

                              {/* CUT LINE FOR LAST ITEM */}
                              {isLast && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    left: "6px",
                                    top: "11px",
                                    bottom: 0,
                                    width: "2px",
                                    background: "black"
                                  }}
                                />
                              )}

                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "rgba(255,255,255,0.7)",
                                  textAlign:"left"
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

            </Box>
          );
        })}
      </Box>
    </Box>
  );
}