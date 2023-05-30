import { Link } from "@solidjs/router";
import MenuIcon from "@suid/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@suid/material";

export default function Nav(props: {score?: number}) {
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
    </Box>
  );
}
