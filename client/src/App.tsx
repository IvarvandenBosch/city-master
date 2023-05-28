import { Component, createSignal } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Game } from "./pages/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { purple } from "@suid/material/colors";
import { createTheme, ThemeProvider } from "@suid/material/styles";


// Set the colors up
const theme = createTheme({
  palette: {
    primary: {
      main: "#8400ff",
    },
    secondary: {
      main: "#000",
    },
  },
});

const App: Component = () => {
  return (
    <>
      <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Routes>
      </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
