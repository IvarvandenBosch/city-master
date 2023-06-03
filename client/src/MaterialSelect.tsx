import { Component, createSignal } from "solid-js";
import { UserInterface } from "./UserInterface";
import { Button, Divider } from "@suid/material";

type matSelectT = {
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
  volume: number;
  setVolume: Function;
};

export const MaterialSelect: Component<matSelectT> = (props) => {
  const materials = [
    { name: "grass", price: 10, rotation: 0, broken: false, loading: false },
    { name: "tree", price: 50, rotation: 0, broken: false, loading: false },
    { name: "house-1", price: 500, rotation: 0, broken: false, loading: false },
    { name: "house-2", price: 500, rotation: 0, broken: false, loading: false },
    { name: "house-3", price: 500, rotation: 0, broken: false, loading: false },
    { name: "shop", price: 1000, rotation: 0, broken: false, loading: false },
    { name: "water", price: 10, rotation: 0, broken: false, loading: false },
    { name: "road-h", price: 100, rotation: 0, broken: false, loading: false },
    { name: "road-Ld", price: 100, rotation: 0, broken: false, loading: false },
    { name: "road-Ulr", price: 100, rotation: 0, broken: false, loading: false },
    { name: "road-fourway", price: 100, rotation: 0, broken: false, loading: false },
    { name: "sand", price: 10, rotation: 0, broken: false, loading: false },
  ];

  return (
    <aside class="material-list">
      <h1>Materials</h1>
      <h3>
        {props.selectedMaterial()?.name.split("-")[0] ??
          "Select a material" +
            " " +
            (props.selectedMaterial()?.name.split("-")[1] ?? "")}
      </h3>
      <div class="flex">
        {materials.map((material, idx) => {
          return (
            <>
              <section>
                <button
                  onClick={() => props.setSelectedMaterial(material)}
                  style={{
                    rotate:
                      material.name === props.selectedMaterial()?.name
                        ? props.selectedMaterial().rotation + "deg"
                        : 0 + "deg",
                  }}
                  class={
                    material.name === props.selectedMaterial()?.name
                      ? "selected" +
                        " " +
                        "material-select" +
                        " " +
                        material.name
                      : "material-select" + " " + material.name
                  }
                ></button>
                <p>{material.price}</p>
              </section>
            </>
          );
        })}
      </div>
      <Button
        class="reset"
        variant="contained"
        title="press 'c'"
        onClick={() => props.setSelectedMaterial(undefined)}
      >
        Clear
      </Button>

      <Divider class="margin-block" />

      <UserInterface
        score={props.score}
        setScore={props.setScore}
        selectedMaterial={props.selectedMaterial}
        setSelectedMaterial={props.setSelectedMaterial}
        setVolume={props.setVolume}
        volume={props.volume}
      />
    </aside>
  );
};
