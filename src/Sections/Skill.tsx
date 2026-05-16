// import Hero from "../components/Hero"
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import SkillsTree from '../components/SkillCards'



const Skill = () => {

  return (
    <Box
      className={`individual_sections`}
      id="Skills"
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      sx={{
        mb: { xs: '900px', sm: 0 }
      }}
    >
      
      <SkillsTree />

    </Box>
  )
}

export default Skill