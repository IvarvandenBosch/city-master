import { Component, createSignal } from "solid-js";

type matSelectT = {
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
};


export const MaterialSelect: Component<matSelectT> = (props) => {
  const materials = [
    {name: "grass", price: 10, rotation: 0},
    {name: "house-1", price: 500, rotation: 0},
    {name: "house-2", price: 500, rotation: 0},
    {name: "house-3", price: 500, rotation: 0},
    {name: "shop", price: 1000, rotation: 0},
    {name: "water", price: 10, rotation: 0},
    {name: "road-h", price: 100, rotation: 0},
    {name: "road-Ld", price: 100, rotation: 0},
    {name: "road-Ulr", price: 100, rotation: 0},
    {name: "road-fourway", price: 100, rotation: 0},
    {name: "sand", price: 10, rotation: 0}
];


  return (
    <aside class="material-list">
      <h1>Materials</h1>
      <h3>{props.selectedMaterial().name ?? "Select a material"}</h3>
      <div class="flex">
        {materials.map((material, idx) => {
          return (
            <>
            <section>
              <button
                onClick={() => props.setSelectedMaterial(material)}
                style={{
                  rotate: material.name === props.selectedMaterial()?.name ? (props.selectedMaterial().rotation + "deg") : 0 + "deg"
                }}
                class={material.name === props.selectedMaterial()?.name ? ("selected" + " " + "material-select" + " " + material.name) : ("material-select" + " " + material.name) }
              ></button>
              <p>{material.price}</p>
            </section>
            </>
          );
        })}
      </div>
    </aside>
  );
};
