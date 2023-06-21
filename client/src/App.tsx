import { Component, createSignal } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Game } from "./pages/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";

import { Home } from "./pages/Home";
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
      <meta
        name="google-signin-client_id"
        content="513833206021-sm40o60a994pm0spmabljhpjsrnj8te6.apps.googleusercontent.com"
      />
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
