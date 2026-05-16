import { Box } from "@mui/material"
import { useRef } from 'react';


const Projects = () => {
  // const revealImgRef = useRef(null);
  const revealImgRef = useRef<HTMLDivElement | null>(null);

  return (

    <Box
      style={{
        // height: 'fit-content',

        position: 'relative',
        overflow: 'hidden',

      }}
      onMouseMove={(e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >

      <Box style={{
        // left: '0px',
        // transform: 'translate(-50%,-53%)',
        width: '90%',
        minHeight: '80vh',
        backgroundColor: 'rgb(0,0,0)',
        borderRadius: '20px',
        border: '2px solid rgb(189, 158, 255)',
        display: 'flex',
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        zIndex: 6,
        padding:"20px"
      }}
      sm={{top:'-200px'}}>

      {/* <Box
      > */}

        {/* <div className={`individual_sections`} id="Projects"> */}

        <Box className="heading " style={{ paddingBlock: "50px" }} >
          <h1>Projects</h1>
        </Box>


      </Box>
    </Box >


  )
}

export default Projects

