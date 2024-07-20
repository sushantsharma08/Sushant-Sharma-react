
import { Box } from "@mui/material"
import { color } from "three/examples/jsm/nodes/Nodes.js";
const date = new Date();

const Footer = () => {
  return (
    <footer>
      <Box sx={{padding:"10px",borderTop:"1px solid #363636",textAlign:"center",color:"grey"}}>
        &copy;Sushant Sharma {date.getFullYear()}
      </Box>
    </footer>
  )
}

export default Footer