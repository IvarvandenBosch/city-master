import { Component, createSignal } from 'solid-js';
import { PlayingField } from './PlayingField';

// styling
import styles from './App.module.css';
import { MaterialSelect } from './MaterialSelect';

const App: Component = () => {
  const [score, setScore] = createSignal(0)

  return (
    <main class={styles.App}>
      <PlayingField score={score()}/>
      <MaterialSelect />
    </main>
  );
};

export default App;
