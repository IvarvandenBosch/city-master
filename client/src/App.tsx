import { Component, createSignal } from 'solid-js';
import { PlayingField } from './PlayingField';

// styling
import styles from './App.module.css';
import { MaterialSelect } from './MaterialSelect';

const App: Component = () => {
  const [score, setScore] = createSignal(0)
  const [selectedMaterial, setSelectedMaterial] = createSignal<string>()

  return (
    <main class={styles.App}>
      <PlayingField score={score()} selectedMaterial={selectedMaterial} />
      <MaterialSelect selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}/>
    </main>
  );
};

export default App;
