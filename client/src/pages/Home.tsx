import { Component, createSignal } from "solid-js";
import Layout from "../Layout";
import { Button, Divider, IconButton } from "@suid/material";
import {
  FaSolidPlay,
  FaSolidArrowDown,
} from "solid-icons/fa";
import Tutorial from "../components/page/Tutorial";
import About from "../components/page/About";
import PageCar from "../components/page/PageCar";

export const Home: Component = () => {
  return (
    <Layout>
      <main class="home">
        <section>
          <div class="center car-boundings">
            <PageCar />
            <section>
              <h1>City Master</h1>
              <p>
                Build and drive your way to a thriving city in our top-down 2D
                game!
              </p>
              <div class="buttongroup">
                <Button variant="outlined">Tutorial</Button>
                <Button variant="contained" class="play" onClick={() => location.href = "/game"}>
                  <FaSolidPlay />
                  Play
                </Button>
              </div>
            </section>
          </div>
          <IconButton class="tutorial-downward" title="tutorial">
            <FaSolidArrowDown />
          </IconButton>
        </section>
      </main>
      <Tutorial />
      <About />
    </Layout>
  );
};
