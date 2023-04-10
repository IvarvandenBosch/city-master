import { Component, createSignal } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Game } from "./pages/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

const App: Component = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/game" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
