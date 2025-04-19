// components/Terminal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';



interface LogEntry {
    command: string;
    output: string;
}


export default function Terminal() {
    const [logs, setLogs] = useState<LogEntry[]>([
        { command: "", output: "Welcome to the Terminal...\n Firstly switch user with 'su' command \n type 'help' to know more commands." }
    ]);
    const [input, setInput] = useState('');
    const [terminalUser, setTerminalUser] = useState('user');

    const inputRef = useRef<HTMLInputElement>(null);
    const logEndRef = useRef<HTMLDivElement>(null);


    const commandMap: Record<string, () => string> = {

        about: () => `I'm a full-stack dev with a passion for clean UI and embedded systems.`,
        clear: () => '',
        hello: () => `Hello ${terminalUser}, I hope you are having a good time scrolling. `,
        help: () => { return `Available commands: ${Object.keys(commandMap).map(el => { return el })}` },
        // reset: () => "Welcome to the Terminal...\n Firstly switch user with 'su' command \n type 'help' to know more commands.",
        skills: () => `
        +---------------------------------------------+
        |                  Frontend                   |
        +---------------------------------------------+
        | - JavaScript                                |
        | - Angular 12/13                             |
        | - React (TSX)                               |
        | - Bootstrap, Tailwind CSS, NG Zorro         |
        | - MUI, Three.js, Responsive Design          |
        +---------------------------------------------+
        
        +---------------------------------------------+
        |                   Backend                   |
        +---------------------------------------------+
        | - Node.js                                   |
        | - Express.js                                |
        | - WebSockets (Socket.IO)                    |
        | - Asynchronous Programming                  | 
        +---------------------------------------------+
        
        +---------------------------------------------+
        |               Authentication                |
        +---------------------------------------------+
        | - JWT                                       |
        | - Cookies                                   |
        +---------------------------------------------+
        
        +---------------------------------------------+
        |             State Management                |
        +---------------------------------------------+
        | - React Query                               |
        +---------------------------------------------+
        
        +---------------------------------------------+
        |               Cloud / DevOps                |
        +---------------------------------------------+
        | - Firebase                                  |
        | - Vercel                                    |
        +---------------------------------------------+
        
        +---------------------------------------------+
        |                   Tools                     |
        +---------------------------------------------+
        | - GitHub                                    |
        | - Vite                                      |
        | - Postman                                   |
        | - VSCode                                    |
        +---------------------------------------------+
        
        +---------------------------------------------+
        |             Microcontrollers                |
        +---------------------------------------------+
        | - Arduino                                   |
        | - ESP32                                     |
        +---------------------------------------------+
        
            `,
        su: () => `Usage: su <username>`,
        whois: () => `Missed 'about me' section?`,
        // history:()=>{
        //     console.log(logs);

        //     return `${logs.map(el=>{return `${el.command} \n` })}`}
        projects: () => `
1. E-Money Lender 💰

• MERN-based platform for lenders to manage client records securely.
• Live: https://e-money-lender.vercel.app/
        
2. Home Automation using ESP-32 🏠

• IoT-powered system with real-time control via MERN and ESP32.
• Live: https://hiveautomations.vercel.app/
        
3. Flappy Bird 2.0 🐤

• Flappy Bird remake with login, scoreboard, and MongoDB storage.
        
4. Crop Prediction 🌾

• Predicts best-yielding crops using ML, Arduino, and IoT sensors.
        
5. Origetto 📘
• Class 12 study resource site built with React and Firebase.`,

    };


    useEffect(() => {
        if (logs.length > 2) {
            logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [logs]);

    const handleCommand = () => {
        const trimmed = input.trim();
        const command = trimmed.toLowerCase();
        let output: string;
        console.log(command);

        if (command.startsWith('su ')) {
            const newUser = trimmed.split(' ')[1];
            if (newUser) {
                setTerminalUser(newUser);
                setLogs((prev) => [...prev, { command: '', output: `Switched to user: ${newUser}` }]);
            } else {
                setLogs((prev) => [...prev, { command: trimmed, output: `Usage: su <username>` }]);
            }
        } else {
            output = commandMap[command]?.() ?? `Command not found: ${command}`;

        }


        setLogs((prev) => {
            if (command === 'clear') {
                return []
            }
            if (command === 'reset') {
                return [{ command: '', output: '' }, { command: trimmed, output }]
            }
            else {
                return [...prev, { command: trimmed, output }]
            }
        }
        );
        setInput('');
        // logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand();
            // logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Paper
            sx={{
                // backgroundColor: '#0001115b',
                background: 'linear-gradient(135deg, #0a0f0d6b, #0f1a1557)',
                color: '#0f0',
                fontFamily: 'monospace',
                p: 2,
                pt: 0,
                height: 600,
                // width:650,
                overflowY: 'auto',
                borderRadius: 2,
                textAlign: 'left',
                border: "2px solid #313131"
            }}
            onClick={() => inputRef.current?.focus()}
            elevation={3}
            id="terminal"
        >
            <Box
                sx={{
                    backgroundColor: '#1e1e1e8c',
                    px: 2,
                    py: 1,
                    borderBottom: '1px solid #333',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                }}
            >
                TERMINAL
            </Box>
            {logs.map((log, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                    <Typography component="div" sx={{ whiteSpace: 'pre-wrap', color: "#dda991", fontFamily: '"JetBrains Mono", monospace', fontSize: { xs: '0.9rem', sm: '1rem' }, }}>
                        <span style={{ color: '#2c4b2c' }}>{`> ${log.command}`}</span>
                        <br />
                        {log.output}
                    </Typography>
                </Box>
            ))}

            <Box sx={{ display: "flex", flexWrap: 'nowrap' }}>
                <Typography component="div" sx={{ mr: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: { xs: '0.9rem', sm: '1rem' }, }}> <span>{terminalUser}@portfolio:~$</span> </Typography>
                <br />
                <TextField
                    inputRef={inputRef}
                    variant="standard"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            color: '#0f0',
                            fontFamily: 'monospace',
                        },
                    }}
                />
            </Box>
            <div ref={logEndRef} />
        </Paper>
    );
}

