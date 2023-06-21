import { Link } from "@solidjs/router";
import MenuIcon from "@suid/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@suid/material";
import { FaBrandsGithub, FaSolidEnvelope, FaSolidUser } from "solid-icons/fa";
import { createSignal } from "solid-js";

export default function Nav(props: {score?: number}) {
  const [openDrawer, setOpenDrawer] = createSignal(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" class="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" color="secondary" sx={{ flexGrow: 1 }}>
            <Typography class="logo" onClick={() => window.location.href= "/"} variant="h6" component="div" color="secondary" sx={{ flexGrow: 1 }}>
              City Master
            </Typography>
          </Typography>
         {props.score !== undefined && (
          <Typography variant="h6" component="div" color="secondary" sx={{ flexGrow: 1 }}>
            Score: {props.score}
          </Typography>)}
          <Link href="/login"><Button color="primary">Login</Button></Link>
        </Toolbar>
      </AppBar>
        <>
          <Drawer
            anchor={"left"}
            open={openDrawer()}
            sx={{ zIndex: 9999 }}
            onClose={() => setOpenDrawer(false)}
          >
            <List>
              
                <ListItem disablePadding>
                  <ListItemButton style={{"padding-right": "100px"}} onClick={() => window.location.href = "https://github.com/IvarvandenBosch/city-master"}>
                    <ListItemIcon>
                      <FaBrandsGithub /> 
                    </ListItemIcon>
                    <ListItemText primary={"Github"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <a href="mailto:ivvdbosch@gmail.com">
                  <ListItemButton style={{"padding-right": "100px", color: "#212121"}}>
                      <ListItemIcon>
                        <FaSolidEnvelope /> 
                      </ListItemIcon>
                      <ListItemText class="link" style={{"text-decoration": "none"}} primary={"Contact"} />
                  </ListItemButton> 
                  </a>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton style={{"padding-right": "100px"}}>
                    <ListItemIcon>
                      <FaSolidUser />
                    </ListItemIcon>
                    <ListItemText primary={"Account"} />
                  </ListItemButton>
                </ListItem>
            </List>
          </Drawer>
        </>
    </Box>
  );
}
