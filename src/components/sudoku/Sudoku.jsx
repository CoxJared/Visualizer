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

function eliminatesColumnOptions(board, columnNum) {
  //function will update the board that is passed in
  for(let row = 0; row < 9; row++) {
    if(board[columnNum][row].value !== null) {
      for(let i = 0; i < 9; i++){
        removeA(board[columnNum][i].options, board[columnNum][row].value);
      }
    }
  }
}

function eliminateRowOptions(board, rowNum) {
  //function will update the board that is passed in
  for(let column = 0; column < 9; column++) {
    if(board[column][rowNum].value !== null) {
      for(let i = 0; i < 9; i++){
        removeA(board[column][i].options, board[column][rowNum].value);
      }
    }
  }
}

function checkBox(){

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
  let options = [1,2,3,4,5,6,7,8,9]
  return (<div className="sudoku-board">
        {board.map(column => (

          <div className="sudoku-column">
            {column.map(row => (

              //create elements, either solved values or available options
              row.value === null ? 
                <div  className={`sudoku-element element-${column}-${row}`}>
                  {options.map(option => (

                    //create divs for element options
                    row.options.includes(option) ?
                    <div className={`sudoku-option`} style={{backgroundColor:colors[option - 1]}}/>
                    :
                    <div className={`sudoku-option`}/>
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
      
    this.state = {
      board: board,
      boardElements: initialBoardElements
    }
  }

  updateBoardElementsState() {
    let boardElements = updateElementsWithBoardStatus(this.state.board);
    this.setState ({
      boardElements
    })
    console.log(this.state.board);
  }

  shuffleBoard() {
    //replace this with random board options
    let newBoard = createEmptyBoard();
    setupInitialPosition(newBoard);

    let boardElements = updateElementsWithBoardStatus(newBoard)
    this.setState ({
      board: newBoard,
      boardElements});
      console.log(newBoard);
  }

  singleSolutionRun() {


    // eliminate from columns
    for (let column = 0; column < 9; column++) {
      eliminatesColumnOptions(this.state.board, column);
    }

    // eliminate from column
    for (let row = 0; row < 9; row++) {
      console.log()
      eliminateRowOptions(this.state.board,row);
    }

    this.updateBoardElementsState();
  }

  solveBoard() {
      this.singleSolutionRun();
  }

  render() {
    return (
      <div className="sudoku-container">
        {this.state.boardElements}
        <div className="sudoku-options">
          <div className="sudoku-button shuffle-board" onClick={this.shuffleBoard.bind(this)}>
            <h1>Shuffle</h1>
          </div>
          <div className="sudoku-button solve-board" onClick={this.solveBoard.bind(this)}>
            <h1>Solve</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sudoku
