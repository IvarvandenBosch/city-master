import type { Component } from 'solid-js';
import { PlayingField } from './PlayingField';

// styling
import styles from './App.module.css';

const App: Component = () => {
  return (
    <main class={styles.App}>
      <PlayingField />
    </main>
  );
};

export default App;
