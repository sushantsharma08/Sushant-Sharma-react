// import Hero from "../components/Hero"

import { Card } from "@mui/material"


const Skill = () => {
  return (
    <div className={`individual_sections`} id="Skills">
      <section className="text-gray-600 body-font  h-full m-24">
        <div className="template_container ">

          <div className="template">
            <div className="text-center text-xl font-bold opacity-90 flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-400 align-middle mr-28 flex justify-center items-center">
                <i className="bi bi-code-slash text-gray-700/0.5  text-xl"></i></div>
              <span className="w-max sub-Heading">Languages</span>
            </div>
            <hr className="main_hr" />
            <div className=" ">
              <div className="content languages text-center">
                Web Development
              </div>

              <Card variant="outlined" className="template_content " >
              <div className="">
                  <div className="front">Frontend</div>
                  <li>HTML 5</li>
                  <li>JAVA SCRIPT</li>
                  <li>ANGULAR 12/13</li>
                  <li>REACT</li>
                </div>
                <div className="">
                  <div className="front">Backend</div>

                  <li>NODE.JS</li>
                  <li>EXPRESS</li>
                </div>
                </Card>


            </div>
          </div>
          <div className="template">
            <div className="text-center text-xl font-bold opacity-90 flex items-center w-max">
              <div className="h-12 w-12 rounded-full bg-gray-400 align-middle mr-28 flex justify-center items-center">
              </div>
              <span className="w-max sub-Heading">Other Tools & Frameworks</span>
            </div>
            <hr className="main_hr" />
            <div className="template_content ">
              <div className="">
                <div className="front">Web Devlopment</div>

                <li>BOOTSTRAP</li>
                <li>TAILWIND.CSS</li>
                <li>NZ ZORRO</li>
                <li>SOCKET.IO</li>
              </div>

              <div className="">
                <div className="front">Commonly Used</div>

                <li>VS Code</li>
                <li>VERCEL</li>
                <li>GIT HUB</li>
              </div>

              <div className="">
                <div className="front">Database</div>

                <li>FIREBASE</li>
                <li>MONGO DB</li>
              </div>
            </div>
          </div>
          <div className="template">
            <div className="text-center text-xl font-bold opacity-90 flex items-center">
              <span className="w-max sub-Heading">Sports & Hobbies</span>
            </div>
            <hr className="main_hr" />
            <div className="template_content ">
              <div className="">
                <div className="front"></div>

                <li>Running</li>
                <li>Swimming</li>
                <li>Cycling</li>
                <li>Basketball</li>
              </div>



              <div className="">
                <div className="front"></div>

                <li>Sci-Fi</li>
                <li>Astrophysics</li>
                <li>Listen music</li>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Skill