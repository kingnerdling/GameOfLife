let board;
let colsCount = 100;
let rowsCount = 70;
let cellSize = 10;
let cellAliveColor = "#80FF00";
let backgroundColor = 0;
let fps = 5;
function setup() {
  createCanvas(colsCount * cellSize, rowsCount * cellSize);
  frameRate(fps);
  board = createBoard(rowsCount, colsCount);
}

function draw() {
  background(backgroundColor);
  drawBoard();
  board = newBoard();
}

function newBoard() {
  let newBoard = create2DArray(rowsCount, colsCount);
  for (let row = 0; row < rowsCount ; row++) {
    for (let col = 0; col < colsCount; col++) {
      let sum = sumCell(row, col);
      if (board[row][col] == 1 && (sum < 2 || sum > 3)) {
        newBoard[row][col] = 0;
      } else if (board[row][col] == 0 && sum == 3) {
        newBoard[row][col] = 1;
      } else {
        newBoard[row][col] = board[row][col];
      }
    }
  }
  return newBoard;
}

function sumCell(row, col) {
  let sum = 0;
  for (let rowi = row - 1; rowi < row + 2; rowi++) {
    if (rowi >= 0 && rowi <= rowsCount - 1) {
      for (let coli = col - 1; coli < col + 2; coli++) {
        if (coli >= 0 && coli <= colsCount - 1) {
          sum += board[rowi][coli];
        }
      }
    }
  }
  sum -= board[row][col];
  return sum;
}

function createBoard(rows, cols) {
  let grid = create2DArray(rows, cols);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let rnd = Math.random();
      if (rnd > 0.4) {
        grid[row][col] = 1;
      }
    }
  }
  return grid;
}

function create2DArray(rows, cols) {
  let arr = new Array(rows); // create an empty array of length n
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill(0); // make each element an array
  }
  return arr;
}

function drawBoard() {
  for (let row = 0; row < rowsCount; row++) {
    for (let col = 0; col < colsCount; col++) {
      fill(getCellColour(board[row][col]));
    
      rect(col * cellSize, row * cellSize, cellSize -1, cellSize-1);
    }
  }
}


function getCellColour(cell) {
  if (cell == 1) {
    return cellAliveColor;
  } else {
    return backgroundColor;
  }
}
