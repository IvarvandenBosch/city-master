import { Component, createSignal } from "solid-js";
import { PlayingField } from "../PlayingField";
import Layout from '../Layout'

// styling
import { MaterialSelect } from "../MaterialSelect";
import { UserInterface } from "../UserInterface";

export const Game: Component = () => {
  const [score, setScore] = createSignal(0);
  const [selectedMaterial, setSelectedMaterial] = createSignal<string>();
  const [volume, setVolume] = createSignal<number>(40);

  return (
    <Layout score={score()} noFooter={true}>
      <main>
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
