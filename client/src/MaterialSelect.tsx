import { Component, createSignal } from "solid-js"


export const MaterialSelect: Component = () => {
    const materials = [
        "grass", "house-1", "house-2", "house-3", "shop", "water", "road-h", "road-v", "road-Ld", "road-Rd", "road-Ul", "road-Ur"
    ] 

    const [selectedMaterial, setSelectedMaterial] = createSignal<string>()

    return (
        <aside class="material-list">
            <h1>Materials</h1>
            <h3>{selectedMaterial() ?? "Select a material"}</h3>
            {materials.map((material, idx) => {
            return (
                <button onClick={() => setSelectedMaterial(material)} style={{
                    outline: material === selectedMaterial() ? "solid blue 2px" : ""
                }} class={"material-select" + " " + material}></button>
            )
        })}</aside>
    )
}