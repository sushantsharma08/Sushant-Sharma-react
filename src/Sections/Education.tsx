
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';


function createData(
  semester: string,
  sgpa: number,
  cgpa: number,
) {
  return { semester, sgpa, cgpa, };
}

const rows = [
  createData('I', 9.96, 9.96),
  createData('II', 9.29, 9.64),
  createData('III', 9.13, 9.47),
  createData('IV', 8.83, 9.32,),
  createData('V', 8.55, 9.18,),
  createData('VI', 8.67, 9.09,),
  createData('VII', 9.28, 9.11,),
  createData('VIII', 10.00, 9.18,),
];

const Education = () => {
  return (
    <Box className={`individual_sections`} id='Educational Qualifications' >
      <Box className="heading">
        <h1>Educational Qualifications</h1>
      </Box>

      <Box className="content" sx={{ textAlign: "left", }}>

        <Accordion sx={{ backgroundColor: "#101214", color: "rgba(255, 255, 255, 0.87)" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon sx={{ color: "rgba(255, 255, 255, 0.87)" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >

            <Typography sx={{fontSize: "large",}}>
              <li>
                <span><b className="qualification highlighted">Bachelor of Technology, CSE, </b><i className="institute">Medi-Caps University, Indore</i></span>
                <br />
                <span className="edu_result">Cumulative Grade Point Average : 9.18</span>
              </li>
            </Typography>

          </AccordionSummary>

          <AccordionDetails sx={{ backgroundColor: "#101214", color: "grey" }}>

            <TableContainer component={Paper} >
              <Table sx={{  backgroundColor: "#101214", border: "1px solid grey" }} aria-label="customized table" >
                <TableHead >
                  <TableRow sx={{ color: "grey" }}>
                    <TableCell sx={{ borderBottom:"1px dotted grey",color: "#8b8b8b" }}><b>Semester</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom:"1px dotted grey",color: "#8b8b8b" }}><b>SGPA</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom:"1px dotted grey",color: "#8b8b8b" }}><b>CGPA</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.semester} >
                      <TableCell component="th" scope="row" sx={{ borderBottom:"1px dotted grey",color: "grey" }}>{row.semester}</TableCell>
                      <TableCell align="right" sx={{ borderBottom:"1px dotted grey",color: "grey" }}>{row.sgpa} </TableCell>
                      <TableCell align="right" sx={{ borderBottom:"1px dotted grey",color: "grey" }}>{row.cgpa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>



          </AccordionDetails>

        </Accordion>

        <AccordionSummary
          
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{fontSize: "large"}}>
            <li>
              <span><b className="qualification highlighted">Class XII, PCM, </b><i className="institute">Army Public School, MHOW</i></span>
              <br />
              <span className="edu_result">Result - 81%</span>
            </li>
          </Typography>
        </AccordionSummary>

        <AccordionSummary
          
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{fontSize: "large"}}>
            <li>
              <span><b className="qualification highlighted">Class X, </b><i className="institute">Army Public School, MHOW</i></span>
              <br />
              <span className="edu_result">Result - 87.6%</span>
            </li>
          </Typography>
        </AccordionSummary>


      </Box>


    </Box>
  )
}

export default Education