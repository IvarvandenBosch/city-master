import { Component, createSignal, createEffect } from "solid-js";

export const PlayingField: Component = (props) => {
    const gridSize = {
        rows: 25,
        cols: 25
    }

    const [fieldGrid, setFieldGrid] = createSignal(Array.from({ length: gridSize.rows }, () => Array.from({ length: gridSize.cols }, () => "grass")))

    function fieldMutation() {
        let newGrid = [...fieldGrid()]
        newGrid[2][4] = "road-h"
        newGrid[2][5] = "road-Ld"
        newGrid[3][5] = "road-v"
        newGrid[4][5] = "road-v"
        newGrid[4][5] = "road-Ur"
        newGrid[4][6] = "road-h"
        newGrid[3][6] = "house-1 rotated90"
        newGrid[2][6] = "shop rotated90"
        console.log(newGrid)
        setFieldGrid([...newGrid])
    }
    return (
        <div class="grid">{fieldGrid().map((rows: any, idx: number) => {
            return (
                <div class="rows">
                    {rows.map((cols: any, idx: number) => {
                        return (<div class={"cols" + " " + cols}></div>)
                    })}
                </div>
            )
        })}
        <button onClick={() => fieldMutation()}>Click</button></div>
    )
}


