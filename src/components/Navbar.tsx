import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GlassSurface from './GlassNavbar'


interface Props {
  window?: () => Window;
}

const drawerWidth = 280;

/** Fixed navbar sits ~12px from top + ~72px tall — offset scroll targets accordingly */
const NAV_SCROLL_OFFSET = 96;

const navItems = [
  "Experience",
  "About",
  "Skills",
  "Projects",
  "Educational Qualifications",
  "Contact Me",
];

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToSection = (item: string) => {
    const el = document.getElementById(item);
    if (!el) return;
    const top = el.getBoundingClientRect().top + globalThis.scrollY - NAV_SCROLL_OFFSET;
    globalThis.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sushant Sharma
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // Custom displacement effects
    <GlassSurface
      displace={0.5}
      distortionScale={-180}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
      brightness={50}
      opacity={0.93}
      mixBlendMode="screen"
      style={{
        position: "fixed",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "min(94vw, 1100px)",
        maxWidth: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 1, minHeight: { xs: 56, md: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: { xs: "block", md: "block" },
              fontSize: { xs: "1rem", sm: "1.15rem" },
              whiteSpace: "nowrap",
            }}
          >
            Sushant Sharma
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexWrap: "wrap", gap: 0.5, justifyContent: "flex-end" }}>
            {navItems.map((item) => (
              <Button
                key={item}
                size="small"
                sx={{ color: "#fff", fontSize: "0.8rem", px: 1.25 }}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </GlassSurface>

  );
}



// export default Navbar