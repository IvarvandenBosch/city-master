import { Component } from "solid-js";

type userInterfaceT = {
    selectedMaterial: Function;
    setSelectedMaterial: Function;
    score: number;
    setScore: Function;
}

export const UserInterface: Component<userInterfaceT>  = (props) => {

    function incDecDegreees(key: string) {
        if (!props.selectedMaterial()){return}
        let material = {...props.selectedMaterial()}
        if (key === "inc") {
            if (props.selectedMaterial().rotation + 90 > 360) {
                return
            }
            material = {...material, rotation: props.selectedMaterial().rotation + 90}
        } else if (key === "dec") {
            if (props.selectedMaterial().rotation - 90 < 0) {
                return
            }
            material = {...material, rotation: props.selectedMaterial().rotation - 90}
        }
        props.setSelectedMaterial({...material})
    }
    return (
        <div>
            <p>Rotate: {`(${props.selectedMaterial()?.rotation ? props.selectedMaterial().rotation : 0} degrees)`}</p>
            <button class="backward" onClick={() => incDecDegreees("dec")}>-90 degrees</button>
            <button class="forward" onClick={() => incDecDegreees("inc")}>+90 degrees</button>
            <button onClick={() => props.setScore((prevScore: number) => prevScore + 200)}>Cheat code (+ 200 score)</button>
        </div>
    )
}