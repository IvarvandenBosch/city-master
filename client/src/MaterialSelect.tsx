import { Component, createSignal } from "solid-js";
import { FaSolidXmark } from 'solid-icons/fa'

type matSelectT = { 
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
};


export const MaterialSelect: Component<matSelectT> = (props) => {
  const materials = [
    {name: "grass", price: 10, rotation: 0, broken: false},
    {name: "house-1", price: 500, rotation: 0, broken: false},
    {name: "house-2", price: 500, rotation: 0, broken: false},
    {name: "house-3", price: 500, rotation: 0, broken: false},
    {name: "shop", price: 1000, rotation: 0, broken: false},
    {name: "water", price: 10, rotation: 0, broken: false},
    {name: "road-h", price: 100, rotation: 0, broken: false},
    {name: "road-Ld", price: 100, rotation: 0, broken: false},
    {name: "road-Ulr", price: 100, rotation: 0, broken: false},
    {name: "road-fourway", price: 100, rotation: 0, broken: false},
    {name: "sand", price: 10, rotation: 0, broken: false}
];


  return (
    <aside class="material-list">
      <h1>Materials</h1>
      <h3>{props.selectedMaterial()?.name.split('-')[0] ?? "Select a material" + " " + (props.selectedMaterial()?.name.split('-')[1] ?? "") }</h3>
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
                class={material.name === props.selectedMaterial()?.name ? ("selected" + " " + "material-select" + " " + material.name) : ("material-select" + " " + material.name)}
              ></button>
              <p>{material.price}</p>
            </section>
            </>
          );
        })}
      </div>
        <button class="reset" onClick={() => props.setSelectedMaterial(undefined)}><FaSolidXmark /></button>
    </aside>
  );
};
