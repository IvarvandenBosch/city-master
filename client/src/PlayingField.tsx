import { Component, createSignal, createEffect } from "solid-js";
import Car from "./Car";

type playingFieldT = {
  selectedMaterial: Function;
  setSelectedMaterial: Function;
  score: number;
  setScore: Function;
  volume: number;
};

export const PlayingField: Component<playingFieldT> = (props) => {
  const gridSize = {
    rows: 25,
    cols: 25,
  };

  const grassObject = { name: "grass", price: 10, rotation: 0, broken: false };
  const [fieldGrid, setFieldGrid] = createSignal(
    Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => grassObject)
    )
  );
  const [displayList, setDisplayList] = createSignal<string[]>([]);
  const [inProgress, setInProgress] = createSignal<boolean>(false);

  // Check if user Is currently on the webpage
  let insideDocument = true;
  document.addEventListener(
    "visibilitychange",
    function handleVisibilityChange() {
      if (document.hidden) {
        insideDocument = false;
      } else {
        insideDocument = true;
      }
    },
    false
  );

  function addToDisplay(
    row: number | undefined,
    col: number | undefined,
    key: string,
    value: undefined | number
  ) {
    let newDisplayList = [...displayList()];
    if (typeof row === "number" && typeof col === "number") {
      if (key === "add") {
        newDisplayList.push(`+${fieldGrid()[row][col].price * 0.5} [SOLD]`);
      } else if (key === "subtract") {
        newDisplayList.push(`-${props.selectedMaterial().price} [BOUGHT]`);
      }
    }

    if (!row && !col && value) {
      if (key === "add") {
        newDisplayList.push(`+${value}`);
      } else if (key === "subtract") {
        newDisplayList.push(`-${value}`);
      }
    }

    if (newDisplayList.length > 3) {
      newDisplayList.shift();
    }

    setDisplayList(newDisplayList);
  }

  let colRef: HTMLDivElement | ((el: HTMLDivElement) => void);

  function fieldMutation(
    row: number,
    col: number,
    event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }
  ) {
    let newGrid = [...fieldGrid()];

    if (newGrid[row][col].broken) {
      if (inProgress()) {
        alert("You can only remove one broken piece at a time.");
      } else {
        event.target.classList.add("loading");
        setInProgress(true);

        const timeout = setTimeout(() => {
          // Remove loading animation after 5 seconds
          event.target.classList.remove("loading");
          newGrid[row][col].broken = false;
          props.setScore((prevScore: number) => prevScore + 30);
          addToDisplay(undefined, undefined, "add", 30);
          event.target.classList.remove("broken");
          setInProgress(false);
          clearTimeout(timeout); // Clear previous timeout
        }, 5000);
      }
    }

    if (
      props.selectedMaterial() === undefined ||
      (fieldGrid()[row][col].name === props.selectedMaterial().name &&
        fieldGrid()[row][col].rotation === props.selectedMaterial().rotation)
    ) {
      return;
    }

    if (props.score - props.selectedMaterial().price >= 0) {
      props.setScore(
        (prevScore: number) => prevScore + fieldGrid()[row][col].price * 0.5
      );
      addToDisplay(row, col, "add", undefined);
      props.setScore(
        (prevScore: number) => prevScore - props.selectedMaterial().price
      );
      addToDisplay(row, col, "subtract", undefined);
    } else {
        const sound = new Audio("../GameAudio/wrong.mp3");
        sound.volume = props.volume / 100;
        sound.play();
        return
    }

    findSurroundings(newGrid, col, row);
    playAudio();
    setFieldGrid([...newGrid]);
  }
  function findSurroundings(newGrid: any[][], col: number, row: number) {
    const surroundingsArray = [
      newGrid[row - 1] && newGrid[row - 1][col],
      newGrid[row + 1] && newGrid[row + 1][col],
      newGrid[row] && newGrid[row][col - 1],
      newGrid[row] && newGrid[row][col + 1],
    ];

    // Materials that have grass in them, but also other things
    const grassSurrounded = [
      "house-1",
      "house-2",
      "house-3",
      "shop",
      "road-Ld",
    ];

    if (grassSurrounded.includes(props.selectedMaterial().name)) {
      let sandCount = 0;

      surroundingsArray.forEach((surroundingCell) => {
        if (
          surroundingCell &&
          (surroundingCell.name === "sand" ||
            surroundingCell.name.startsWith("sand-"))
        ) {
          sandCount += 1;
        }
      });

      if (sandCount >= 3 || newGrid[row][col].name === "sand") {
        newGrid[row][col] = {
          ...props.selectedMaterial(),
          name: `sand-${props.selectedMaterial().name}`,
        };
      } else {
        newGrid[row][col] = props.selectedMaterial();
      }
    } else {
      newGrid[row][col] = props.selectedMaterial();
    }
  }

  // Plays the correct audio
  function playAudio() {
    const audios = [
      { material: "sand", url: "../GameAudio/sand.mp3" },
      { material: "water", url: "../GameAudio/splash.mp3" },
      { material: "place", url: "../GameAudio/place.mp3" },
      { material: "grass", url: "../GameAudio/grass.mp3" },
      { material: "tree", url: "../GameAudio/grass.mp3" },
    ];

    const selectedAudio =
      audios.find(
        (audio) => audio.material === props.selectedMaterial().name
      ) ?? audios.find((audio) => audio.material === "place");
    if (selectedAudio === undefined) {
      throw console.error("Selected audio is not defined.");
    }
    const sound = new Audio(selectedAudio?.url);
    sound.volume = props.volume / 100;
    sound.play();
  }

  // Gets random material and turns it to a broken one
  function randomMaterial() {
    let gridClone = [...fieldGrid()];
    let flatGridClone = gridClone.flat();

    let possibleArray: any[] = [];
    const correctMaterials = [
      "road-Ld",
      "road-Ulr",
      "road-h",
      "sand-road-Ld",
      "water",
      "grass",
    ];

    for (
      let flattendIdx = 0;
      flattendIdx < flatGridClone.length;
      flattendIdx++
    ) {
      if (
        !flatGridClone[flattendIdx].broken &&
        correctMaterials.includes(flatGridClone[flattendIdx].name)
      ) {
        possibleArray.push(flattendIdx);
      }
    }

    if (possibleArray.length > 0) {
      const randomIdx = Math.floor(Math.random() * possibleArray.length);
      const rowIndex = Math.floor(possibleArray[randomIdx] / gridSize.rows);
      const colIndex = possibleArray[randomIdx] % gridSize.cols;

      gridClone[rowIndex][colIndex] = {
        ...gridClone[rowIndex][colIndex],
        broken: true,
      };
      setFieldGrid([...gridClone]);
    }
  }

  // Runs random Material every 2.33 minutes
  createEffect(() => {
    const randomMaterialInterval = setInterval(function () {
      randomMaterial();
    }, 160000);
    return () => {
      clearInterval(randomMaterialInterval);
    };
  }, []);

  let grass = 0;
  let houses = 0;
  let roads = 0;
  let shops = 0;
  let trees = 0;
  let brokenMats = 0;

  function calculateScore(
    grassCount: number,
    roadCount: number,
    shopCount: number,
    houseCount: number,
    treeCount: number,
    brokenMatsCount: number
  ) {
    let deviationScore = 0;
    let totalArea = grassCount + roadCount + shopCount + houseCount + treeCount;
    const amountOfMats = 5;

    const idealGrassPercentage = 66;
    const idealRoadsPercentage = 10.5;
    const idealShopsPercentage = 7.5;
    const idealHousesPercentage = 12;
    const idealTreesPercentage = 4;

    const grassPercentage = (grassCount / totalArea) * 100;
    const roadsPercentage = (roadCount / totalArea) * 100;
    const shopsPercentage = (shopCount / totalArea) * 100;
    const housesPercentage = (houseCount / totalArea) * 100;
    const treesPercentage = (treeCount / totalArea) * 100;

    deviationScore += Math.pow(
      (grassPercentage - idealGrassPercentage) / idealGrassPercentage,
      2
    );
    deviationScore += Math.pow(
      (roadsPercentage - idealRoadsPercentage) / idealRoadsPercentage,
      2
    );
    deviationScore += Math.pow(
      (shopsPercentage - idealShopsPercentage) / idealShopsPercentage,
      2
    );
    deviationScore += Math.pow(
      (housesPercentage - idealHousesPercentage) / idealHousesPercentage,
      2
    );
    deviationScore += Math.pow(
      (treesPercentage - idealTreesPercentage) / idealTreesPercentage,
      2
    );

    let score = 100 - (deviationScore * 100) / amountOfMats;
    score = Math.min(score, 100);
    score = Math.max(score, 10);

    // Product of score * 0.5 to the power of how many broken materials there are.
    score = score * 0.5 ** brokenMats;
    score = Math.round(score);
    return score;
  }

  function countAll() {
    // Reset all values
    grass = 0;
    houses = 0;
    roads = 0;
    shops = 0;
    trees = 0;
    brokenMats = 0;

    fieldGrid()
      .flat()
      .forEach((mat) => {
        const houseArray = ["house-1", "house-2", "house-3"];
        const roadsArray = [
          "road-h",
          "road-v",
          "road-Ld",
          "road-Rd",
          "road-Ul",
          "road-Ur",
          "road-Ulr",
        ];

        if (mat.broken) {
          brokenMats += 1;
        }
        if (mat.name === "grass") {
          grass += 1;
        } else if (mat.name === "tree") {
          trees += 1;
        } else if (houseArray.includes(mat.name)) {
          houses += 1;
        } else if (roadsArray.includes(mat.name)) {
          roads += 1;
        } else if (mat.name === "shop") {
          shops += 1;
        }
      });
  }

  // Receive money every 5 seconds and remove from displaylist
  createEffect(() => {
    const interval = setInterval(function () {
      if (insideDocument) {
        countAll();
        props.setScore(
          (prevScore: number) =>
            prevScore +
            calculateScore(grass, roads, shops, houses, trees, brokenMats)
        );
        addToDisplay(
          undefined,
          undefined,
          "add",
          calculateScore(grass, roads, shops, houses, trees, brokenMats)
        );
      }
      return () => {
        clearInterval(interval);
      };
    }, 5000);
  }, []);

  return (
    <div class="display-list">
      <div class="grid">
        {displayList().map((el) => {
          if (el.startsWith("-")) {
            return <p style={{ color: "red" }}>{el}</p>;
          } else if (el.startsWith("+")) {
            return <p style={{ color: "green" }}>{el}</p>;
          }
        })}
      </div>
      <div class="field">
        <Car volume={props.volume}/>
        {fieldGrid().map((rows: any, rowIdx: number) => {
          return (
            <>
              <div class="rows">
                {rows.map((cols: any, colIdx: number) => {
                  return (
                    <div
                      style={{
                        rotate: cols.rotation + "deg",
                      }}
                      ref={colRef}
                      onClick={(event) => fieldMutation(rowIdx, colIdx, event)}
                      class={
                        "cols" +
                        " " +
                        `${cols.name}` +
                        " " +
                        `${cols.broken ? "broken" : ""}`
                      }
                    ></div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
