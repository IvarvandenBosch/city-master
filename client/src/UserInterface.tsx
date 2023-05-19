import { Component } from "solid-js";
import { FaSolidArrowRotateRight } from "solid-icons/fa";

type userInterfaceT = {
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
  volume: number;
  setVolume: Function;
};

export const UserInterface: Component<userInterfaceT> = (props) => {
  window.addEventListener("keypress", (event) => {
    if (event.key === "r") {
      rotate();
    }
  });

  function rotate() {
    if (!props.selectedMaterial()) {
      return;
    }
    let material = { ...props.selectedMaterial() };

    const rotationValues = [0, 90, 180, 270];
    let currentRotation = rotationValues.indexOf(
      props.selectedMaterial().rotation
    );

    if (currentRotation + 1 > 3) {
      currentRotation = 0;
    } else {
      currentRotation++;
    }

    material = { ...material, rotation: rotationValues[currentRotation] };

    props.setSelectedMaterial({ ...material });
  }

  return (
    <div class="ui">
      <section>
        <p>
          Rotate:{" "}
          {`(${
            props.selectedMaterial()?.rotation
              ? props.selectedMaterial().rotation
              : 0
          } degrees)`}
        </p>
        <button class="rotate" onClick={() => rotate()} title="press 'r'">
          <FaSolidArrowRotateRight />
        </button>
      </section>
      <section>
        <p>Volume ({props.volume})</p>
        <input
          type="range"
          value={props.volume}
          max={100}
          min={0}
          onChange={(e) => props.setVolume(e.currentTarget.valueAsNumber)}
        />
      </section>
    </div>
  );
};
