// Car.tsx

import { createSignal, onCleanup, createEffect, onMount } from "solid-js";
import getIndexes from "./carLogic";

interface CarStyle {
  [key: string]: string | number;
}

export default function Car(props: {
  volume: number;
  field: { name: string; broken: boolean; price: number; rotation: number }[][];
  setField: Function;
}) {
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
  const [showRange, setShowRange] = createSignal<any>(false);

  function handleKeyDown(event: { key: string }) {
    if (event.key === "q") {
      setShowRange(true);
    }
  }

  function handleKeyUp(event: { key: string }) {
    if (event.key === "q") {
      setShowRange(false);
    }
  }

  // Register keydown and keyup event listeners
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Cleanup event listeners when the component unmounts
  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
  });

  // Add event listeners for keydown and update the position accordingly
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      const allKeys = [
        "ArrowUp",
        "w",
        "ArrowDown",
        "s",
        "ArrowLeft",
        "a",
        "ArrowRight",
        "d",
      ];

      if (allKeys.includes(key)) {
        event.preventDefault();
      }

      // Update position based on the key pressed
      switch (key) {
        case "ArrowUp":
        case "w":
          if (position().y - speed() >= 2) {
            checkOverlap();
            breakHouses();
            setPosition((prevPos) => ({
              ...prevPos,
              y: prevPos.y - speed(),
            }));
            setDirection("up");
          }
          break;

        case "ArrowDown":
        case "s":
          if (position().y + speed() < 970) {
            checkOverlap();
            breakHouses();
            setPosition((prevPos) => ({
              ...prevPos,
              y: prevPos.y + speed(),
            }));
            setDirection("down");
          }
          break;

        case "ArrowLeft":
        case "a":
          if (position().x - speed() >= 0) {
            checkOverlap();
            breakHouses();
            setPosition((prevPos) => ({
              ...prevPos,
              x: prevPos.x - speed(),
            }));
            setDirection("left");
          }
          break;

        case "ArrowRight":
        case "d":
          if (position().x + speed() < 960) {
            checkOverlap();
            breakHouses();
            setPosition((prevPos) => ({
              ...prevPos,
              x: prevPos.x + speed(),
            }));
            setDirection("right");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  function playCantDoThat() {
    const sound = new Audio("../GameAudio/wrong.mp3");
    sound.volume = props.volume / 100;
    sound.play();
    return;
  }

  function breakHouses() {
    const indexes = getIndexes(direction(), position());
    const fieldClone = structuredClone(props.field);

    const housesList = ["house-1", "house-2", "house-3"];
    let hasBroken = false;
    indexes.forEach((indexes) => {
      const { x, y } = indexes;
      if (housesList.includes(fieldClone[y][x].name))
        if (!fieldClone[y][x].broken) {
          fieldClone[y][x].broken = true;
          hasBroken = true;
        }
    });

    if (hasBroken) {
      props.setField(fieldClone);
    }
  }

  function checkOverlap() {
    const carElement = document.querySelector(".car");
    const roadClasses = ["road-h", "road-Ld", "road-Ulr", "road-fourway"];
    if (carElement) {
      const carRect = carElement.getBoundingClientRect();
      const overlappingElements = Array.from(
        document.getElementsByClassName("cols")
      ).filter((element) => {
        const elementRect = element.getBoundingClientRect();
        return (
          roadClasses.some((className) =>
            element.classList.contains(className)
          ) && doRectsOverlap(carRect, elementRect)
        );
      });

      if (overlappingElements.length > 0) {
        if (checkBrokenElement(overlappingElements)) {
          if (speed() !== 0.2) {
            setSpeed(0.2);
          }
        } else if (speed() !== 10) {
          setSpeed(10);
        }
      } else {
        if (speed() !== 1) {
          setSpeed(1);
        }
      }
    }
  }

  // Helper function to check if two rectangles overlap
  function doRectsOverlap(rect1: DOMRect, rect2: DOMRect) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  function checkBrokenElement(elList: Element[]) {
    let hasBroken = false;
    elList.forEach((element) => {
      if (element.classList.contains("broken")) {
        hasBroken = true;
      }
    });
    return hasBroken;
  }

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

  return (
    <>
      <div class={`car ${showRange() ? "show-range" : ""}`} style={style()}>
        <div class="top" onClick={playCantDoThat}></div>
        <div class="right" onClick={playCantDoThat}></div>
        <div class="bottom" onClick={playCantDoThat}></div>
        <div class="left" onClick={playCantDoThat}></div>
      </div>
    </>
  );
}
