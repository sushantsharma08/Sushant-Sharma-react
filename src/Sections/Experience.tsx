
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';
import DotGrid from '../components/DotBackground';

export default function OutlinedTimeline() {
    return (
        <div className={`individual_sections`} style={{ position: "relative", minHeight: "600px",overflow:"hidden" }}>


            <div style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                opacity: 0.7,
            }}>

                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271E37"
                        activeColor="#5227FF"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                </div>
            </div>



            <Timeline position="alternate"
                sx={{ mb: 30, position: "relative", zIndex: 1 }}
                id="Experience">
                <Box className="heading " >
                    <Typography variant="h3" sx={{ color: "#434343", fontWeight: "bold", textAlign: "center", paddingBottom: "80px" }}>Experience</Typography>
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
                        <Box
                            onMouseMove={(e: any) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                const rotateX = (y / rect.height - 0.5) * -10;
                                const rotateY = (x / rect.width - 0.5) * 10;

                                e.currentTarget.style.transform =
                                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                            }}
                            onMouseLeave={(e: any) => {
                                e.currentTarget.style.transform =
                                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
                            }}

                            sx={{
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",

                                background: "rgba(0, 255, 255, 0.03)",
                                border: "1px solid rgba(255,255,255,0.12)",

                                borderRadius: "16px",
                                padding: "16px 20px",

                                // depth
                                boxShadow: `0 8px 32px rgba(0,0,0,0.25),
                                inset 0 1px 0 rgba(255,255,255,0.1)`,

                                // 3D feel
                                transform: "perspective(1000px) translateZ(0)",
                                transition: "all 0.3s ease",

                                // spacing
                                display: "inline-block",
                                maxWidth: "400px",
                            }}
                        >
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
                        </Box>

                    </TimelineContent>
                </TimelineItem>



                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" color="warning" />
                        <TimelineConnector sx={{ height: 100 }} />

                    </TimelineSeparator>

                    <TimelineContent>
                        <Box
                            onMouseMove={(e: any) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                const rotateX = (y / rect.height - 0.5) * -10;
                                const rotateY = (x / rect.width - 0.5) * 10;

                                e.currentTarget.style.transform =
                                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                            }}
                            onMouseLeave={(e: any) => {
                                e.currentTarget.style.transform =
                                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
                            }}

                            sx={{
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",

                                background: "rgba(255, 198, 128, 0.03)",
                                border: "1px solid rgba(255,255,255,0.12)",

                                borderRadius: "16px",
                                padding: "16px 20px",

                                // depth
                                boxShadow: `0 8px 32px rgba(0,0,0,0.25),
                                inset 0 1px 0 rgba(255,255,255,0.1)`,

                                // 3D feel
                                transform: "perspective(1000px) translateZ(0)",
                                transition: "all 0.3s ease",

                                // spacing
                                display: "inline-block",
                                maxWidth: "400px",
                            }}
                        >
                            <b className='timeline_heading' style={{
                                // color: "#c28017"
                                color: "#773131",
                            }}>
                                System Engineer
                            </b>
                            <span> <br />
                                <Typography sx={{
                                    // color: "#824141", 
                                    color: "#906829",
                                    fontSize: 17, textAlign: "start",
                                }}>
                                    | Tata Consultancy Services (TCS)
                                </Typography>
                                |  Feb 2025 – Present</span>


                        </Box>

                    </TimelineContent>
                </TimelineItem>

            </Timeline>
        </div>
    );
}
