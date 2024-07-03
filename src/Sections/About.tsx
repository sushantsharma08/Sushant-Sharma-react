import { Box } from "@mui/material"

const About = () => {
  return (
    <div className={`individual_sections`} id="About">
      <div className="heading">
        <h1 >About Me</h1>
      </div>

      <Box className="content" >
        <p style={{ fontSize: "larger", lineHeight: "35px" }}>

          A <b className="highlighted_about"> Computer Science Engineering Graduate </b>, A tech enthusiast and a fitness geek,
          <br />who likes to play and learn in my free time.
          <br />
          <br />
          I work with javascript and its frameworks to build   end-to-end web projects  integrated <br />
          with databases and deployed using cloud based services like vercel and github.
          <br /><br />
          My goal is to make a meaningful impact in the field of software engineering, <br />
          both in terms of delivering exceptional software solutions  and nurturing the growth <br /> of the individuals
          around me.
          <br />
          <br />
          Looking for working environment where performance is rewarded with <br /> more responsibilities and knowlege to
          grow
          along with.
        </p>
      </Box>
    </div>
  )
}

export default About