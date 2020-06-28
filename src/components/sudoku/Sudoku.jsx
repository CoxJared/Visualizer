import React, { Component } from 'react'
import './Sudoko.css'

const SPEED_FACTOR = 300

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

function createEmptyBoard() {
  let board = [];
  for(let x = 0; x < 9; x++) {
    let column = [];
    for(let y = 0; y < 9; y++){
      column.push({
        value: null,
        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      });
    }
    board.push(column);
  }
}

export class Sudoku extends Component {
  constructor() {
    super()
    let emptyBoard = createEmptyBoard();
    this.state = {
      board: emptyBoard
    }
  }

  updateBoardElements() {
    
  }

  render() {
    return (
      <div className="sudoku-container">
        <div className="sudoko-board">
          
        </div>
      </div>
    )
  }
}

export default Sudoku
