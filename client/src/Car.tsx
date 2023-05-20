// Car.tsx

import { createSignal, onCleanup, createEffect, onMount } from "solid-js";

interface CarStyle {
  [key: string]: string | number;
}

export default function Car() {
  const [direction, setDirection] = createSignal("right");
  const [speed, setSpeed] = createSignal(10);
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [style, setStyle] = createSignal<CarStyle>({
    position: "absolute",
    width: "50px",
    height: "30px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    rotate: 0,
    transition: "top 0.1s, left 0.1s, rotate 0.2s ease",
  });
  const [carRef, setCarRef] = createSignal<any>();
  
  // Add event listeners for keydown and update the position accordingly
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Update position based on the key pressed
      if (key === "ArrowUp" || key === "w") {
        event.preventDefault();
        if (position().y - speed() >= 2) {
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - speed() }));
          setDirection("up");
        }
      } else if (key === "ArrowDown" || key === "s") {
        event.preventDefault();
        if (position().y + speed() < 970) {
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + speed() }));
          setDirection("down");
        }
      } else if (key === "ArrowLeft" || key === "a") {
        if (position().x - speed() >= 0) {
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - speed() }));
          setDirection("left");
        }
      } else if (key === "ArrowRight" || key === "d") {
        if (position().x + speed() < 960) {
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + speed() }));
          setDirection("right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });


  // Update the style signal when the position changes
  createEffect(() => {
    const { x, y } = position();
    const dir = direction();
    setStyle((prevStyle) => ({
      ...prevStyle,
      top: `${y}px`,
      left: `${x}px`,
      rotate:
        dir === "right"
          ? 0 + "deg"
          : dir === "down"
          ? 90 + "deg"
          : dir === "left"
          ? 180 + "deg"
          : 270 + "deg",
    }));
  });

  return <div class="car" ref={carRef} style={style()}></div>;
}
