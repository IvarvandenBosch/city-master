import { Component, createSignal, createEffect } from "solid-js";

export const PlayingField:  Component<{
    selectedMaterial: Function;
    setSelectedMaterial: Function;
  }>  = (props) => {
    const gridSize = {
        rows: 25,
        cols: 25
    }

    const [fieldGrid, setFieldGrid] = createSignal(Array.from({ length: gridSize.rows }, () => Array.from({ length: gridSize.cols }, () => "grass")))

    function fieldMutation(row: number, col: number ) {
        if (props.selectedMaterial() === undefined || fieldGrid()[row][col] === props.selectedMaterial()) {
            return
        }

        let newGrid = [...fieldGrid()]
        newGrid[row][col] = `${props.selectedMaterial()}`
        setFieldGrid([...newGrid])
    }

    let grass = 0
    let houses = 0
    let roads = 0
    let shops = 0

    function calculateScore(grassCount: number, roadCount: number, shopCount: number, houseCount: number) {
        let deviationScore = 0;
        let totalArea = grassCount + roadCount + shopCount + houseCount
    
        const idealGrassPercentage = 70;
        const idealRoadsPercentage = 10.5;
        const idealShopsPercentage = 7.5;
        const idealHousesPercentage = 12;
      
        const grassPercentage = grassCount / totalArea * 100;
        const roadsPercentage = roadCount / totalArea * 100;
        const shopsPercentage = shopCount / totalArea * 100;
        const housesPercentage = houseCount / totalArea * 100;
      
        deviationScore += Math.pow((grassPercentage - idealGrassPercentage) / idealGrassPercentage, 2);
        deviationScore += Math.pow((roadsPercentage - idealRoadsPercentage) / idealRoadsPercentage, 2);
        deviationScore += Math.pow((shopsPercentage - idealShopsPercentage) / idealShopsPercentage, 2);
        deviationScore += Math.pow((housesPercentage - idealHousesPercentage) / idealHousesPercentage, 2);
    
        let score = 100 - deviationScore * 100 / 4;
        score = Math.min(score, 100);
        score = Math.max(score, 10);
        score = Math.round(score);
        return score;
    }
    
    createEffect(() => {
        // Reset all values
        grass = 0
        houses = 0
        roads = 0
        shops = 0

        fieldGrid().flat().forEach((str, idx) => {
            
        const houseArray = ["house-1", "house-2", "house-3"]
        const roadsArray = ["road-h","road-v","road-Ld","road-Rd","road-Ul","road-Ur"]
        
        if (str === "grass") {
            grass += 1
        } else if (houseArray.includes(str)) {
            houses += 1
        } else if (roadsArray.includes(str)) {
            roads += 1
        } else if (str === "shop") {
            shops += 1
        }
        })
        console.log(calculateScore(grass, roads, shops, houses))
    }, [fieldGrid])
    
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


