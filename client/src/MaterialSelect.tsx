import { Component, createSignal } from "solid-js";

type matSelectT = {
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
};


export const MaterialSelect: Component<matSelectT> = (props) => {
  const materials = [
    {name: "grass", price: 10},
    {name: "house-1", price: 500},
    {name: "house-2", price: 500},
    {name: "house-3", price: 500},
    {name: "shop", price: 1000},
    {name: "water", price: 10},
    {name: "road-h", price: 100},
    {name: "road-v", price: 100},
    {name: "road-Ld", price: 100},
    {name: "road-Rd", price: 100},
    {name: "road-Ul", price: 100},
    {name: "road-Ur", price: 100},
    {name: "road-Ulr", price: 100},
    {name: "sand", price: 10}
];


  return (
    <aside class="material-list">
      <h1>Materials</h1>
      <h3>{props.selectedMaterial() ?? "Select a material"}</h3>
      <div class="flex">
        {materials.map((material, idx) => {
          return (
            <>
            <section>
              <button
                onClick={() => props.setSelectedMaterial(material)}
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
