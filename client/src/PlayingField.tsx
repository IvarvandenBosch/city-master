import { Component, createSignal, createEffect } from "solid-js";

export const PlayingField: Component = (props) => {
    const gridSize = {
        rows: 25,
        cols: 25
    }

    const [fieldGrid, setFieldGrid] = createSignal(Array.from({ length: gridSize.rows }, () => Array.from({ length: gridSize.cols }, () => "grass")))

    function fieldMutation(row: number, col: number ) {
        let newGrid = [...fieldGrid()]
        newGrid[row][col] = `${props.selectedMaterial()}`
        setFieldGrid([...newGrid])
    }

    return (
        <div class="grid">{
            fieldGrid().map((rows: any, rowIdx: number) => {
                return (
                    <div class="rows">
                        {rows.map((cols: any, colIdx: number) => {
                            return (<div onClick={() => fieldMutation(rowIdx, colIdx)} class={"cols" + " " + cols}></div>)
                        })}
                    </div>
                )
            })}
        </div>
    )
}


