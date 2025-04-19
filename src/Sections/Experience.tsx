
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';

export default function OutlinedTimeline() {
    return (
        // <div className={`individual_sections`} id="About">

            <Timeline position="alternate">
                <Box className="heading " >
                    <Typography variant="h3" sx={{ color: "#434343", fontWeight: "bold", textAlign: "center" }}>Experience</Typography>
                </Box>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" />
                        <TimelineConnector />
                        <TimelineConnector />

                    </TimelineSeparator>
                    <TimelineContent>

                    </TimelineContent>
                </TimelineItem>


                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" color="primary" />
                        <TimelineConnector sx={{ height: 100 }} />
                    </TimelineSeparator>
                    <TimelineContent>
                        <span style={{ textAlign: "left" }}>
                            <b className='timeline_heading' style={{ color: "rgb(54, 81, 130)" }} >Software Engineer Intern</b> <br />
                            <span>

                                <Typography sx={{
                                    color: "#5c4d84", fontSize: 17, textAlign: "end",
                                }}>
                                    | Amantya Technologies
                                </Typography>
                                | Jun - Aug 2024</span>
                        </span>

                    </TimelineContent>
                </TimelineItem>



                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" color="secondary" />
                        <TimelineConnector sx={{ height: 100 }} />

                    </TimelineSeparator>

                    <TimelineContent>
                        <b className='timeline_heading' style={{

                            // color: "#c28017"
                            color: "#773131",
                        }}>System Engineer</b>
                        <span> <br />
                            <Typography sx={{
                                // color: "#824141", 
                                color: "#906829",
                                fontSize: 17, textAlign: "start",
                            }}>
                                | Tata Consultancy Services (TCS)
                            </Typography>
                            |  Feb 2025 – Present</span>


                    </TimelineContent>
                </TimelineItem>

            </Timeline>
        
    );
}
