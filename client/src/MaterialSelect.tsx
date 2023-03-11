import { Component, createSignal } from "solid-js";

export const MaterialSelect: Component<{
  selectedMaterial: Function;
  setSelectedMaterial: Function;
}> = (props) => {
  const materials = [
    "grass",
    "house-1",
    "house-2",
    "house-3",
    "shop",
    "water",
    "road-h",
    "road-v",
    "road-Ld",
    "road-Rd",
    "road-Ul",
    "road-Ur",
    "sand"
  ];

  return (
    <aside class="material-list">
      <h1>Materials</h1>
      <h3>{props.selectedMaterial() ?? "Select a material"}</h3>
      {materials.map((material, idx) => {
        return (
          <button
            onClick={() => props.setSelectedMaterial(material)}
            style={{
              outline:
                material === props.selectedMaterial() ? "solid blue 2px" : "",
            }}
            class={"material-select" + " " + material}
          ></button>
        );
      })}
    </aside>
  );
};
