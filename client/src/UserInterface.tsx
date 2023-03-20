import { Component } from "solid-js";
import { FaSolidArrowRotateRight } from 'solid-icons/fa'

type userInterfaceT = {
    selectedMaterial: Function;
    setSelectedMaterial: Function;
    score: number;
    setScore: Function;
}

export const UserInterface: Component<userInterfaceT>  = (props) => {

    // function incDecDegreees(key: string) {
    //     if (!props.selectedMaterial()){return}
    //     let material = {...props.selectedMaterial()}
    //     if (key === "inc") {
    //         if (props.selectedMaterial().rotation + 90 > 360) {
    //             return
    //         }
    //         material = {...material, rotation: props.selectedMaterial().rotation + 90}
    //     } else if (key === "dec") {
    //         if (props.selectedMaterial().rotation - 90 < 0) {
    //             return
    //         }
    //         material = {...material, rotation: props.selectedMaterial().rotation - 90}
    //     }
    //     props.setSelectedMaterial({...material})
    // }

    window.addEventListener("keypress", (event) => {
        if (event.key === "r") {
            rotate()
        }
    });

    function rotate() {
        if (!props.selectedMaterial()){return}
        let material = {...props.selectedMaterial()}

        const rotationValues = [0, 90, 180, 270]
        let currentRotation = rotationValues.indexOf(props.selectedMaterial().rotation)

        if (currentRotation + 1 > 3) {
            currentRotation = 0
        } else {
            currentRotation++
        }

        material = {...material, rotation: rotationValues[currentRotation]}
        

        props.setSelectedMaterial({...material})
    }

    return (
        <div class="ui">
            <p>Rotate: {`(${props.selectedMaterial()?.rotation ? props.selectedMaterial().rotation : 0} degrees)`}</p>
            <button class="rotate" onClick={() => rotate()} title="press 'r'"><FaSolidArrowRotateRight /></button>
            <button onClick={() => props.setScore((prevScore: number) => prevScore + 200)}>Cheat code (+ 200 score)</button>
        </div>
    )
}