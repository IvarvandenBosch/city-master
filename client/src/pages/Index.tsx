import { Component, createSignal } from "solid-js";
import { PlayingField } from "../PlayingField";

// styling
import styles from "../App.module.css";
import { MaterialSelect } from "../MaterialSelect";
import { UserInterface } from "../UserInterface";

export const Game: Component = () => {
  const [score, setScore] = createSignal(0);
  const [selectedMaterial, setSelectedMaterial] = createSignal<string>();
  const [volume, setVolume] = createSignal<number>(40);
  const [matsExpanded, setMatsExpanded] = createSignal<boolean>(true);

  return (
    <>
      <nav>
        Score: {score()}{" "}
        <button
          class="navbtn"
          onClick={() => setMatsExpanded((expaned: any) => !expaned)}
        >
          test
        </button>
      </nav>
      <main class={styles.App}>
        <PlayingField
          score={score()}
          setScore={setScore}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          volume={volume()}
        />
        <MaterialSelect
          matsExpanded={matsExpanded()}
          score={score()}
          setScore={setScore}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          volume={volume()}
          setVolume={setVolume}
        />
      </main>
    </>
  );
};
