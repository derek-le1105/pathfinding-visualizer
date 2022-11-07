import './index.css'

import React, { Component } from 'react'

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isVisited,
      isFinish,
      isStart,
      isWall,
      isPath,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props
    //console.log(this.props)

    const classDeciderName = isFinish
      ? 'node finishing'
      : isStart
      ? 'node starting'
      : isWall
      ? 'node wall'
      : isVisited
      ? 'node visited'
      : isPath
      ? 'node path'
      : 'node'

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${classDeciderName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    )
  }
}
