import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import SectionPanel from "../components/SectionPanel";

const semesterRows = [
  { semester: "I", sgpa: 9.96, cgpa: 9.96 },
  { semester: "II", sgpa: 9.29, cgpa: 9.64 },
  { semester: "III", sgpa: 9.13, cgpa: 9.47 },
  { semester: "IV", sgpa: 8.83, cgpa: 9.32 },
  { semester: "V", sgpa: 8.55, cgpa: 9.18 },
  { semester: "VI", sgpa: 8.67, cgpa: 9.09 },
  { semester: "VII", sgpa: 9.28, cgpa: 9.11 },
  { semester: "VIII", sgpa: 10.0, cgpa: 9.18 },
];

const qualifications = [
  {
    id: "btech",
    degree: "B.Tech, Computer Science & Engineering",
    school: "Medi-Caps University, Indore",
    result: "CGPA 9.18",
    expandable: true,
  },
  {
    id: "xii",
    degree: "Class XII, PCM",
    school: "Army Public School, MHOW",
    result: "81%",
    expandable: false,
  },
  {
    id: "x",
    degree: "Class X",
    school: "Army Public School, MHOW",
    result: "87.6%",
    expandable: false,
  },
];

const Education = () => {
  return (
    <SectionPanel
      id="Educational Qualifications"
      variant="education"
      heading="Education"
      lead="Academic background and results."
      contentClassName="education_panel"
    >
      <Box className="education_list">
        {qualifications.map((item) =>
          item.expandable ? (
            <Accordion
              key={item.id}
              disableGutters
              elevation={0}
              className="education_accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.7)" }} />}
                aria-controls={`${item.id}-content`}
                id={`${item.id}-header`}
              >
                <Box className="education_entry_summary">
                  <Typography className="education_degree">{item.degree}</Typography>
                  <Typography className="education_school">{item.school}</Typography>
                </Box>
                <Typography className="education_result">{item.result}</Typography>
              </AccordionSummary>
              <AccordionDetails className="education_details">
                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table size="small" className="education_table" aria-label="Semester grades">
                    <TableHead>
                      <TableRow>
                        <TableCell>Semester</TableCell>
                        <TableCell align="right">SGPA</TableCell>
                        <TableCell align="right">CGPA</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {semesterRows.map((row) => (
                        <TableRow key={row.semester}>
                          <TableCell component="th" scope="row">
                            {row.semester}
                          </TableCell>
                          <TableCell align="right">{row.sgpa}</TableCell>
                          <TableCell align="right">{row.cgpa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Box key={item.id} className="education_entry">
              <Box className="education_entry_summary">
                <Typography className="education_degree">{item.degree}</Typography>
                <Typography className="education_school">{item.school}</Typography>
              </Box>
              <Typography className="education_result">{item.result}</Typography>
            </Box>
          ),
        )}
      </Box>
    </SectionPanel>
  );
};

export default Education;
