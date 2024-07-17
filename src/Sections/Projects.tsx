import { Box } from "@mui/material"

const Projects = () => {
  return (
    <div className={`individual_sections`} id="Projects">


      <Box className="heading ">
        <h1>Projects</h1>
      </Box>


      {/* <Box> */}

        <div className="template_container "  >

          <div className="project_template project_glass   ">

            <div className="project_template_content project_template_front">

              <img src="/assets/logo.png" width="300px" className="project_img" />
            </div>

            {/* <div className="project_template_content project_template_back">

              <div className="template_header">
                <span className=" project_sub_Heading">E-Money-Lender</span>
                <hr className="main_hr" />
                <h1>Hetddfddj</h1>

              </div>
            </div> */}
          </div>

          <div className="project_template project_glass">
            <div className="template_header">
              <div className="">
              </div>
            </div>
            {/* <hr className="main_hr" /> */}
            <div className="project_template_content ">
              <span className=" project_sub_Heading">Flappy Bird V2.0</span>
            </div>
          </div>

          <div className="project_template project_glass">
            <div className="template_header">
              <div className="">
              </div>
            </div>
            {/* <hr className="main_hr" /> */}
            <div className="project_template_content ">
              <span className=" project_sub_Heading" style={{ lineHeight: "45px" }}>Search Algorithm <br /> Vizualiser</span>
            </div>
          </div>

          <div className="project_template project_glass">
            <div className="template_header">
              <div className="">
              </div>
            </div>
            {/* <hr className="main_hr" /> */}
            <div className="project_template_content ">
              <span className=" project_sub_Heading">Flappy Bird V2.0</span>
            </div>
          </div>
        </div >
      {/* </Box> */}
    </div>

  )
}

export default Projects