import { Box } from "@mui/material"
import blob from "/assets/blob.gif"

const Projects = () => {
  return (
    <div className={`individual_sections`} id="Projects">


      <Box className="heading ">
        <h1>Projects</h1>
      </Box>


      <Box>

        <div className="template_container " style={{ height: "90vh" }} >

          <div className="project_template project_glass">
            <div className="template_header">
              <div className="">
              </div>
              {/* <span className=" project_sub_Heading">E-Money-Lender</span> */}
            </div>
            {/* <hr className="main_hr" /> */}
            <div className="project_template_content ">

              <img src="/assets/logo.png" width="300px" className="project_img" />
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
      </Box>
    </div>

  )
}

export default Projects