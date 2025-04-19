import { Box, Divider, Typography } from "@mui/material"

const About = () => {
  return (
    <div className={`individual_sections`} id="About">
      <div className="heading">
        <h1 >About Me</h1>
      </div>

      <Box className="content" >
        <Typography
          variant="body1"
          sx={{
            // fontFamily: '"JetBrains Mono", monospace',
            // fontFamily: '"Manrope", sans-serif',
            fontSize: { xs: '1rem', md: '1.3rem' },
            lineHeight: 1.7,
            color: '#ccc',
            whiteSpace: 'pre-line',
            letterSpacing: { xs: 'inherit', md: 1.5 },
          }}
        >
          A <b className="highlighted_about">Software Engineer</b>, tech enthusiast, and fitness geek <br />
          who loves to explore and learn during free time.
          <br /><br />
          I specialize in JavaScript and its frameworks to build end-to-end web projects,
          integrated <br /> with databases and deployed using cloud platforms like Vercel and GitHub.
          <br /><br />
          My goal is to make a meaningful impact in software engineering—<br />
          by delivering exceptional software solutions and supporting the growth <br />
          of the people I collaborate with.
          <br />
          <br />
          I’m seeking a work environment where performance is rewarded with <br />
          greater responsibility and opportunities to grow both technically and personally.
        </Typography>

      </Box>

      <div className="individual_sections" id="IndustryExperience">
        <div className="heading">
          <h1>Industry Experience</h1>
        </div>

        <Box className="content">
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.3rem' },
              lineHeight: 1.7,
              color: '#ccc',
              whiteSpace: 'pre-line',
              letterSpacing: { xs: 'inherit', md: 1.5 },
              display: 'flex',
              flexDirection: "column",
              alignItems: 'center',
            }}
          >
            <Box sx={{}}>
              <b className="highlighted_about">Software Engineer Intern</b> | 
              <Typography component="span" sx={{
                color: "#5e5d5f",
                fontSize: { xs: '1rem', md: '1.3rem' },
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                letterSpacing: { xs: 'inherit', md: 1.5 },
                fontWeight:500
              }}>Amantya Technologies </Typography>
               | &bull; Jun - Aug 2024
            </Box>

            <Divider sx={{ my: 2, backgroundColor: '#ccc', width: 'inherit' }} />

            <Box sx={{}}>
              <b className="highlighted_about">System Engineer</b>  |
               <Typography component="span" sx={{
                color: "#5e5d5f",
                fontSize: { xs: '1rem', md: '1.3rem' },
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                letterSpacing: { xs: 'inherit', md: 1.5 },
                fontWeight:500
              }}>Tata Consultancy Services (TCS) </Typography>
               | &bull; Feb 2025 – Present
            </Box>
          </Typography>
        </Box>
      </div>

    </div>
  )
}

export default About