import { Component, createSignal, createEffect } from "solid-js";

type playingFieldT = {
    selectedMaterial: Function;
    setSelectedMaterial: Function;
    score: number;
    setScore: Function;
};


export const PlayingField:  Component<playingFieldT> = (props) => {
    const gridSize = {
        rows: 25,
        cols: 25
    }


    const grassObject = {name: "grass", price: 10, rotation: 0, broken: false}
    const [fieldGrid, setFieldGrid] = createSignal(Array.from({ length: gridSize.rows }, () => Array.from({ length: gridSize.cols }, () => grassObject)))
    const [displayList, setDisplayList] = createSignal<string[]>([])

    // Check if user Is currently on the webpage
    let insideDocument = true
    document.addEventListener("visibilitychange", function handleVisibilityChange() {
        if (document.hidden) {
          insideDocument = false
        } else {
            insideDocument = true
        }
    }, false);

    function addToDisplay(row: number | undefined, col: number | undefined, key: string, value: undefined | number) {
        let newDisplayList = [...displayList()]
        if (typeof row === 'number' && typeof col === 'number') {    
            if (key === 'add') {
                newDisplayList.push(`+${fieldGrid()[row][col].price * 0.5} [SOLD]`);
            } else if (key === 'subtract') {
                newDisplayList.push(`-${props.selectedMaterial().price} [BOUGHT]`);
            }
        }
        
        if (!row && !col && value) {
            if (key === 'add') {
                newDisplayList.push(`+${value}`);
            } else if (key === 'subtract') {
                newDisplayList.push(`-${value}`);
            }
        }
 
        if (newDisplayList.length > 3) {
            newDisplayList.shift()
        }
            

        setDisplayList(newDisplayList)
    }

    let colRef: HTMLDivElement | ((el: HTMLDivElement) => void); 

    function fieldMutation(row: number, col: number, event: MouseEvent & { currentTarget: HTMLDivElement; target: Element; }) {
        let newGrid = [...fieldGrid()]
        
        if (newGrid[row][col].broken) {
            newGrid[row][col].broken = false
            props.setScore((prevScore: number) => prevScore + 30)
            addToDisplay(undefined, undefined, 'add', 30)
            event.target.classList.remove("broken")
        }

        if (props.selectedMaterial() === undefined || fieldGrid()[row][col].name === props.selectedMaterial().name && fieldGrid()[row][col].rotation === props.selectedMaterial().rotation) {
            return
        }


        if (props.score - props.selectedMaterial().price >= 0) {
            props.setScore((prevScore: number) => prevScore + (fieldGrid()[row][col].price * 0.5))
            addToDisplay(row, col, 'add', undefined)
            props.setScore((prevScore: number) => prevScore - props.selectedMaterial().price)
            addToDisplay(row, col, 'subtract', undefined)
        } else {
            return
        }
        
        
        const surroundingsArray = [newGrid[row - 1] && newGrid[row - 1][col],
            newGrid[row + 1] && newGrid[row + 1][col],
            newGrid[row] && newGrid[row][col - 1],
            newGrid[row] && newGrid[row][col + 1]
        ]

        // Materials that have grass in them, but also other things
        const grassSurrounded = ["house-1", "house-2", "house-3", "shop", "road-Ld"]

        if (grassSurrounded.includes(props.selectedMaterial().name)) {
            let sandCount = 0

            surroundingsArray.forEach(surroundingCell => {
              if (surroundingCell && (surroundingCell.name === "sand" || surroundingCell.name.startsWith("sand-"))) {
                sandCount += 1
              }
            })

            if (sandCount >= 3 || newGrid[row][col].name === 'sand') {
                newGrid[row][col] = {
                    ...props.selectedMaterial(),
                    name: `sand-${props.selectedMaterial().name}`
                }
                
            } else {
                newGrid[row][col] = props.selectedMaterial()
            } 
        } else {

            newGrid[row][col] = props.selectedMaterial()
        } 
        setFieldGrid([...newGrid])
    }


    function randomMaterial() {
        let gridClone = [...fieldGrid()]
        let flatGridClone = gridClone.flat()

        let possibleArray: any[] = []
        const correctMaterials = ["road-Ld", "road-Ulr", "road-h", "sand-road-Ld","water", "grass"]

        for (let flattendIdx = 0; flattendIdx < flatGridClone.length; flattendIdx++) {
            if (!flatGridClone[flattendIdx].broken && correctMaterials.includes(flatGridClone[flattendIdx].name)) {
                possibleArray.push(flattendIdx)
            }
        }

        if (possibleArray.length > 0) {
            const randomIdx = Math.floor(Math.random() * possibleArray.length) 
            const rowIndex = Math.floor(possibleArray[randomIdx] / gridSize.rows);
            const colIndex = possibleArray[randomIdx] % gridSize.cols;

            gridClone[rowIndex][colIndex] = {...gridClone[rowIndex][colIndex], broken: true}
            setFieldGrid([...gridClone])
        } else {
            console.log("nothing to be found")
        }
    }


    createEffect(() => {
        const randomMaterialInterval = setInterval(function() {
           randomMaterial()
        }, 160000);
        return () => {
            clearInterval(randomMaterialInterval)
        }
    }, []);
    


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

        fieldGrid().flat().forEach((mat) => {
            
        const houseArray = ["house-1", "house-2", "house-3"]
        const roadsArray = ["road-h","road-v","road-Ld","road-Rd","road-Ul","road-Ur", "road-Ulr"]
        
        if (mat.name === "grass") {
            grass += 1
        } else if (houseArray.includes(mat.name)) {
            houses += 1
        } else if (roadsArray.includes(mat.name)) {
            roads += 1
        } else if (mat.name === "shop") {
            shops += 1
        }
        })
    }, [fieldGrid])

    // Receive money every 5 seconds and remove from displaylist
    createEffect(() => {
        const interval = setInterval(function() {
            if (insideDocument) {
                props.setScore((prevScore: number) => prevScore + calculateScore(grass, roads, shops, houses))
                addToDisplay(undefined, undefined, 'add', calculateScore(grass, roads, shops, houses))
            }
            return () => {
                clearInterval(interval)
            }
        }, 5000);
    }, []);
    
    

    return (
        <div class="display-list">
                <div class="grid">
                {displayList().map(el =>{
                    if (el.startsWith('-')) {
                        return (
                            <p style={{color: 'red'}}>{el}</p>
                            )
                        } else if (el.startsWith('+')) {
                        return (
                            <p style={{color: 'green'}}>{el}</p>
                        )
                    }
                })}
            </div>
            {
            fieldGrid().map((rows: any, rowIdx: number) => {
                return (
                    <>
                        <div class="rows">
                            {rows.map((cols: any, colIdx: number) => {
                                return (<div style={{
                                    rotate: cols.rotation + "deg"
                                }}
                                ref={colRef}
                                onClick={(event) => fieldMutation(rowIdx, colIdx, event)} class={"cols" + " " + `${cols.name}`+ " " + `${cols.broken ? "broken": ""}`}></div>)
                            })}
                        </div>
                    </>
                )
            })}
        </div>
    )
}


