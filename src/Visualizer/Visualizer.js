import './Visualizer.css'
import SettingBar from './PathfindingParameters/SettingBar/SettingBar.js'
import Node from './Node'
import breadthFirstSearch from './Algorithms/breadthFirstSearch'
import depthFirstSearch from './Algorithms/depthFirstSearch'

import React, { useState } from 'react'

// TODO: Fix bug with holding down mouse while on a wall, gives error cursor sometimes

let ROW = 22,
  COLUMN = 50,
  START_NODE = [ROW / 2, Math.floor(COLUMN / 4)],
  END_NODE = [ROW / 2, Math.floor((3 * COLUMN) / 4)]

let defaultBoard = []

console.log(START_NODE, END_NODE)

const Visualizer = () => {
  const generateGrid = () => {
    const tempGrid = []
    for (let i = 0; i < ROW; i++) {
      const currRow = []
      for (let j = 0; j < COLUMN; j++) {
        currRow.push(createNewNode(i, j))
      }
      tempGrid.push(currRow)
    }
    defaultBoard = tempGrid.concat()
    return tempGrid
  }

  const createNewNode = (row, col) => {
    return {
      row,
      col,
      isWall: false,
      isVisited: false,
      isStartingNode: row === START_NODE[0] && col === START_NODE[1],
      isFinishingNode: row === END_NODE[0] && col === END_NODE[1],
      previousNode: null,
      isPath: false,
    }
  }

  const generateWall = (row, col) => {
    const newGrid = grid.slice()
    const currNode = newGrid[row][col]
    const nodeChanged = {
      ...currNode,
      isWall: !currNode.isWall,
    }

    newGrid[row][col] = nodeChanged
    return newGrid
  }

  const onMouseDown = (row, col) => {
    if (!isFinding) {
      const newGrid = generateWall(row, col)
      setGrid(newGrid)
      setMouseHeld(true)
    }
  }

  const onMouseUp = () => {
    console.log('false')
    if (!isFinding) setMouseHeld(false)
  }

  const onMouseEnter = (row, col) => {
    if (mouseHeld && !isFinding) {
      onMouseDown(row, col)
    }
  }

  const startPathFind = async () => {
    if (!isFinding) {
      setIsFinding(true)
      switch (algorithm) {
        case 'Algorithm':
          alert('Please select a sorting algorithm in the dropdown below')
          break
        case 'Breadth First Search':
          await breadthFirstSearch({ ROW, COLUMN, grid, setGrid, START_NODE })
          break
        case 'Depth First Search':
          await depthFirstSearch({ ROW, COLUMN, grid, setGrid, START_NODE })
          break
        default:
          break
      }
      setIsFinding(false)
    }
  }

  const resetBoard = () => {
    if (!isFinding) setGrid(defaultBoard.concat())
  }

  const [grid, setGrid] = useState(generateGrid())
  const [mouseHeld, setMouseHeld] = useState(false)
  const [algorithm, setAlgorithm] = useState('Algorithm')
  const [isFinding, setIsFinding] = useState(false)
  return (
    <>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    row={node.row}
                    col={node.col}
                    isVisited={node.isVisited}
                    isFinish={node.isFinishingNode}
                    isStart={node.isStartingNode}
                    isWall={node.isWall}
                    isPath={node.isPath}
                    onMouseDown={(row, col) => {
                      onMouseDown(row, col)
                    }}
                    onMouseUp={() => {
                      onMouseUp()
                    }}
                    onMouseEnter={(row, col) => {
                      onMouseEnter(row, col)
                    }}
                  ></Node>
                )
              })}
            </div>
          )
        })}
      </div>
      <SettingBar
        isFinding={isFinding}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        startPathFind={startPathFind}
        resetBoard={resetBoard}
      />
    </>
  )
}

export default Visualizer
