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
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props
    //console.log(this.props)

    const classDeciderName = isFinish
      ? ' finishing'
      : isStart
      ? ' starting'
      : isWall
      ? ' wall'
      : ''

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node${classDeciderName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    )
  }
}
