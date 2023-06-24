function getIndexes(direction: string, position: { y: number; x: number }) {
  const cellSize = 40; // Size of each cell in pixels
  const numRows = 1000 / cellSize; // Number of rows in the grid
  const numColumns = 1000 / cellSize; // Number of columns in the grid

  const carWidth =
    direction === "up" || direction === "down"
      ? Math.ceil(30 / cellSize)
      : Math.ceil(50 / cellSize);
  const carHeight =
    direction === "up" || direction === "down"
      ? Math.ceil(50 / cellSize)
      : Math.ceil(30 / cellSize);

  const currentRow = Math.floor(position.y / cellSize); // Current row of the car
  const currentColumn = Math.floor(position.x / cellSize); // Current column of the car

  const occupiedRows = [];
  const occupiedColumns = [];

  if (direction === "up" || direction === "down") {
    const offset = Math.floor((carHeight - 1) / 2); // Offset to adjust for centering the car vertically
    const startRow = currentRow - offset;

    for (let row = startRow; row < startRow + carHeight; row++) {
      occupiedRows.push(row);
    }

    for (let col = currentColumn; col < currentColumn + carWidth; col++) {
      occupiedColumns.push(col);
    }
  } else {
    const offset = Math.floor((carWidth - 1) / 2); // Offset to adjust for centering the car horizontally
    const startColumn = currentColumn - offset;

    for (let row = currentRow; row < currentRow + carHeight; row++) {
      occupiedRows.push(row);
    }

    for (let col = startColumn; col < startColumn + carWidth; col++) {
      occupiedColumns.push(col);
    }
  }

  const overlappingCells = [];

  for (const rowIdx of occupiedRows) {
    for (const colIdx of occupiedColumns) {
      if (
        rowIdx >= 0 &&
        rowIdx < numRows &&
        colIdx >= 0 &&
        colIdx < numColumns
      ) {
        overlappingCells.push({ x: colIdx, y: rowIdx });
      }
    }
  }
  return overlappingCells;
}

export default getIndexes;
