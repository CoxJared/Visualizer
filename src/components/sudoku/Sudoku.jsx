import React, { Component } from 'react'
import './Sudoku.css'

const SPEED_FACTOR = 300

const colors =[
  'rgb(33, 218, 202)',
  'rgb(28, 235, 82)',
  'rgb(38, 168, 255)',
  'rgb(194, 38, 255)',
  'rgb(255, 125, 38)',
  'rgb(235, 100, 79)',
  'rgb(255, 38, 67)',
  'rgb(251, 255, 38)',
  'rgb(38, 42, 255)'
]
// const colors =[
//   'rgb(57, 107, 67)',
//   'rgb(77, 127, 87)',
//   'rgb(97, 147, 107)',
//   'rgb(117, 167, 127)',
//   'rgb(127, 177, 137)',
//   'rgb(137, 187, 147)',
//   'rgb(147, 187, 150)',
//   'rgb(157, 220, 154)',
//   'rgb(172, 230, 174)',
// ]

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
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      });
    }
    board.push(column);
  }
  return board;
}

function setupInitialPosition(board) {
  let values=[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9]
  for(let i =0; i< 9; i++){
    for (let x = 0; x< 9; x++) {
      board[i][x]['value']=values[i*9+x] !== 0? values[i*9+x] : null
    }
  }
}

function updateElementsWithBoardStatus(board) {
  return (<div className="sudoku-board">
        {board.map(column => (
          <div className="sudoku-column">
            {column.map(row => (
              row.value === null ? 
                <div  className={`sudoku-element element-${column}-${row}`}>
                  {row.options.map(option => (
                    <div className={`sudoku-option`} style={{backgroundColor:colors[option - 1]}}/>
                    ))}
                </div>
                : <div className="sudoku-element"
                  style={{backgroundColor:colors[row.value - 1]}}/>    
            ))}
          </div>
        ))}
      </div>)
  }

export class Sudoku extends Component {
  constructor() {
    super()
    let board = createEmptyBoard();

    let initialBoardElements = updateElementsWithBoardStatus(board)
    console.log(board);
      
    this.state = {
      board: board,
      boardElements: initialBoardElements
    }
  }

  shuffleBoard() {
    //replace this with random board options
    let newBoard = createEmptyBoard();
    setupInitialPosition(newBoard);

    let boardElements = updateElementsWithBoardStatus(newBoard)
    this.setState ({
      board: newBoard,
      boardElements});
  }

  solveBoard() {

  }

  render() {
    return (
      <div className="sudoku-container">
        {this.state.boardElements}
        <div className="sudoku-options">
          <div className="sudoku-button shuffle-board" onClick={this.shuffleBoard.bind(this)}>
            <h1>Shuffle</h1>
          </div>
          <div className="sudoku-button solve-board">
            <h1>Solve</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sudoku
