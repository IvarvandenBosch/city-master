import { Component, createSignal } from 'solid-js';
import { PlayingField } from './PlayingField';

// styling
import styles from './App.module.css';
import { MaterialSelect } from './MaterialSelect';
import { UserInterface } from './UserInterface';

const App: Component = () => {
  const [score, setScore] = createSignal(0)
  const [selectedMaterial, setSelectedMaterial] = createSignal<string>()

  return (
    <>
      <nav>Score: {score()}</nav>
      <main class={styles.App}>
        <PlayingField score={score()} setScore={setScore} selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial} />
        <MaterialSelect score={score()} setScore={setScore} selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}/>
        <UserInterface score={score()} setScore={setScore} selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial} />
      </main>
    </>
  );
};

export default App;
