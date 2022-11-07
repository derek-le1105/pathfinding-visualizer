import asyncTimeout from '../HelperFunctions/asyncTimeout'

let ROW = 20,
  COLUMN = 50

let gridCopy = []

let rowQueue = [],
  colQueue = []

let moveCount = 0,
  nodesLeft = 1,
  nodesInNext = 0

let reachedEnd = false

let visited = []

let dr = [-1, 1, 0, 0],
  dc = [0, 0, 1, -1]

const exploreNeighbors = async (row, col, setGrid) => {
  for (let i = 0; i < 4; i++) {
    let rr = row + dr[i]
    let cc = col + dc[i]

    if (rr < 0 || cc < 0) continue
    if (rr >= ROW || cc >= COLUMN) continue
    if (gridCopy[rr][cc].isStart) continue
    if (gridCopy[rr][cc].isWall) continue
    if (gridCopy[rr][cc].isVisited) {
      continue
    }

    let node = document.getElementById(`node-${rr}-${cc}`)
    if (!gridCopy[rr][cc].isFinishingNode) node.style.backgroundColor = `grey`
    rowQueue.push(rr)
    colQueue.push(cc)
    gridCopy[rr][cc].isVisited = true
    gridCopy[rr][cc].previousNode = gridCopy[rr - dr[i]][cc - dc[i]]
    nodesInNext++
    await asyncTimeout({ timeout: 1 })
    setGrid(gridCopy.concat())
  }
}

const solve = async ({ START_NODE, setGrid }) => {
  console.log(gridCopy.length, gridCopy[0].length)
  let [sRow, sCol] = START_NODE
  let shortestPath = []
  rowQueue.push(sRow)
  colQueue.push(sCol)
  console.log(gridCopy)
  gridCopy[sRow][sCol].isVisited = true

  while (rowQueue.length > 0 || colQueue.length > 0) {
    console.log(rowQueue, colQueue)
    let r = rowQueue.shift(),
      c = colQueue.shift()
    console.log(gridCopy[r][c])
    await asyncTimeout({ timeout: 1 })
    if (gridCopy[r][c].isFinishingNode) {
      reachedEnd = true
      for (
        let it = gridCopy[r][c].previousNode;
        it != null;
        it = it.previousNode
      ) {
        shortestPath.unshift(it)
      }
      break
    }
    await exploreNeighbors(r, c, setGrid)
    nodesLeft--
    if (nodesLeft === 0) {
      nodesLeft = nodesInNext
      nodesInNext = 0
      moveCount++
    }
  }
  console.log(shortestPath)
  return shortestPath
}

const breadthFirstSearch = async ({ grid, setGrid, START_NODE, END_NODE }) => {
  gridCopy = grid.slice()
  let move = await solve({ START_NODE, setGrid })
  console.log(move.length)
  for (let i = 1; i < move.length; i++) {
    console.log(move[i].row, move[i].col)
    let pathNode = document.getElementById(`node-${move[i].row}-${move[i].col}`)
    pathNode.style.backgroundColor = `yellow`
    await asyncTimeout({ timeout: 10 })
  }
}

export default breadthFirstSearch
