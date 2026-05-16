import { JoinFullSharp } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"


const About = () => {
  return (
    <div className={`individual_sections`} id="About">
      {/* <div className="heading">
        <h1 >About Me</h1>
      </div> */}

      <Box
      // className="content"
      >
        <Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "center",
              p: 2
            }}
          >
            {[
              { top: "5+", bottom: "Projects Delivered" },
              { top: "Multiple", bottom: "Domains" },
              { top: "1.5+ Yrs", bottom: "Experience" }
            ].map((item, i) => (
              <Box key={i}>

                {/* 🔥 Top Highlight Text */}
                <Box
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #a855f7, #3b82f6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {item.top}
                </Box>

                {/* ✨ Smooth Divider */}
                <hr
                  style={{
                    border: "none",
                    height: "2px",
                    background:
                      "linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)",
                    margin: "6px 0"
                  }}
                />

                {/* 💡 Subtle Bottom Text */}
                <Box
                  sx={{
                    fontSize: "0.9rem",
                    color: "rgba(253, 221, 201, 0.83)",
                    letterSpacing: "0.5px"
                  }}
                >
                  {item.bottom}
                </Box>

              </Box>
            ))}
          </Box>
        </Typography>
      </Box>

    </div>
  )
}

export default About