import { Component, createSignal } from "solid-js";
import { PlayingField } from "../PlayingField";
import Layout from '../layout'

// styling
import styles from "../CSS/App.module.css";
import { MaterialSelect } from "../MaterialSelect";
import { UserInterface } from "../UserInterface";

export const Game: Component = () => {
  const [score, setScore] = createSignal(0);
  const [selectedMaterial, setSelectedMaterial] = createSignal<string>();
  const [volume, setVolume] = createSignal<number>(40);

  return (
    <Layout score={score()}>
      <main class={styles.App}>
        <PlayingField
          score={score()}
          setScore={setScore}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          volume={volume()}
        />
        <MaterialSelect
          score={score()}
          setScore={setScore}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          volume={volume()}
          setVolume={setVolume}
        />
      </main>
    </Layout>
  );
};
