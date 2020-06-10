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

function setupEmptyBoard() {
  let board =[]
  for (let i = 0; i < 9; i++) {
    let row = []
    for (let x = 0; x < 9; x++) {
      row.push({
        value:null,
        options:[1, 2, 3, 4, 5, 6, 7, 8, 9]
      })
    }
    board.push(row)
  }
  return board
}

function convertPositionToElement(board) {
  let elements = board.map(row => (
    <div className="sudoku-row">
      {row.map(element => (
        <div className="sudoku-element">
          {element.value !== null ?
          <h1>{element.value}</h1> :
          element.options.map(option => (
            <h2>{option}</h2>
          ))
          }
          </div>
      ))}
    </div>
  ))
  return elements
}

function setupInitialPosition(board) {
  let values=[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9]
  for(let i =0; i< 9; i++){
    for (let x = 0; x< 9; x++) {
      board[i][x]['value']=values[i*9+x] !== 0? values[i*9+x] : null
    }
  }
  return board
}

export class Sudoku extends Component {
  constructor() {
    super()

    let board = setupEmptyBoard()
    board = setupInitialPosition(board)
   
    this.state = {
      board: board,
      rowsToCheck:[0,1,2,3,4,5,6,7,8],
      columnsToCheck:[0,1,2,3,4,5,6,7,8],
      boxesToCheck:[]
    }
  }

  lightUpRow = (row) => {
    document.getElementById(`visualization-row${row}`).style.backgroundColor='rgb(0, 174, 255)';
    setTimeout( function(){
      document.getElementById(`visualization-row${row}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, SPEED_FACTOR)
  }
  lightUpColumn = (row) => {
    document.getElementById(`visualization-column${row}`).style.backgroundColor='rgb(0, 174, 255)';
    setTimeout( function(){
      document.getElementById(`visualization-column${row}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, SPEED_FACTOR)
  }
  lightUpBox = (box) => {
    document.getElementById(`visualization-box${box}`).style.backgroundColor='rgb(0, 174, 255)';
    setTimeout( function(){
      document.getElementById(`visualization-box${box}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, SPEED_FACTOR)
  }
  lightUpElement = (row, column, color ='rgba(255, 0, 155,.5)') => {
    console.log(row, column)
    document.getElementById(`visualization-element${row}${column}`).style.backgroundColor=color;
    setTimeout( function(){
      document.getElementById(`visualization-element${row}${column}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, SPEED_FACTOR)
  }
  CheckRow = (rowNum) => {
    this.lightUpRow(rowNum)
    for(let x = 0; x < 9; x ++){
      if(this.state.board[rowNum][x].value !== null){
        for(let a =0; a < 9; a++) {
          removeA(this.state.board[rowNum][a]['options'], this.state.board[rowNum][x].value);
          this.setState({done:"e"})
        }
      }
    }
  }
  eliminateOptionsFromRows = () => {
    let i = 0
    let interval = setInterval(() => {
      this.CheckRow(this.state.rowsToCheck[i])
      i++
      if(i>=this.state.rowsToCheck.length){
        clearInterval(interval);
      }
    }, SPEED_FACTOR);
  }

 checkColumn = (columnNum) =>{
  this.lightUpColumn(columnNum)
  for(let x = 0; x < 9; x ++){
    if(this.state.board[x][columnNum].value !== null){
      for(let a =0; a < 9; a++) {
        removeA(this.state.board[a][columnNum]['options'], this.state.board[x][columnNum].value);
        this.setState({done:"e"})
      }
    }
  }
 }

  eliminateOptionsFromColumns = () => {
    let i = 0
    let interval2 = setInterval(() => {
      this.checkColumn(this.state.columnsToCheck[i])
      i++
      if(i>=this.state.columnsToCheck.length){
        clearInterval(interval2);
      }
    }, SPEED_FACTOR);
  }

  eliminateOptionsFromBoxes = () => {
    var i = 0
    var x = 0
    var y = 0
    var interval3 = setInterval(() => {
      this.lightUpBox(i)
      for(let a = 0; a < 3; a++){
        for(let b = 0; b < 3; b++){
          if(this.state.board[(x*3)+a][(y*3)+b].value !== null){

            for( let a2 = 0; a2 < 3; a2++){
              for(let b2 = 0; b2 < 3; b2++){
                removeA(this.state.board[(x*3)+a2][(y*3)+b2]['options'], this.state.board[(x*3)+a][(y*3)+b].value);
                this.setState({done:"e"})
              }
            }
          }
        }
      }
      i++
      y = (y+1)%3
      if(y==0){
        x++
      }
      if(i>8){
        clearInterval(interval3);
      }
    }, SPEED_FACTOR);
  }

  checkLastOption = () =>{
    let rowsToCheck = []
    let columnsToCheck = []
    let boxesToCheck = []

    let i = 0
    let interval = setInterval(() => {
        let row = Math.floor(i / 9)
        let column = i % 9
        if(this.state.board[row][column].value == null 
          && this.state.board[row][column].options.length === 1 ){
            this.lightUpElement(row,column, 'rgb(0, 255,0)')
          // for(let a =0; a < 9; a++) {
            let board  = this.state.board
            board[row][column].value = this.state.board[row][column].options[0]
            if(!rowsToCheck.includes(row)){
            rowsToCheck.push(row)
            }
            if(!columnsToCheck.includes(column)){
            columnsToCheck.push(column)
            }
            this.setState({board:board})
          // }
        } else{
          this.lightUpElement(row,column)
        }
      i++
      if(i>80){
        clearInterval(interval);
      }
    }, SPEED_FACTOR / 9);

    this.setState({columnsToCheck:columnsToCheck,
      rowsToCheck: rowsToCheck})
  }

  solve = () => {
    this.solutionRun()
    var inter = setInterval(() =>{
      this.solutionRun()
    },((this.state.columnsToCheck.length + this.state.rowsToCheck.length) * SPEED_FACTOR) + SPEED_FACTOR *18)
  }

  solutionRun = () => {
    this.eliminateOptionsFromRows()
    setTimeout(() => {
      this.eliminateOptionsFromColumns()
    },this.state.rowsToCheck.length * SPEED_FACTOR)
    setTimeout(() => {
      this.eliminateOptionsFromBoxes()
    },(this.state.columnsToCheck.length + this.state.rowsToCheck.length) * SPEED_FACTOR)
    setTimeout(() => {
      this.checkLastOption()
    },((this.state.columnsToCheck.length + this.state.rowsToCheck.length) * SPEED_FACTOR) + SPEED_FACTOR * 9)
  }

  render() {
    let count = [0, 1, 2, 3, 4, 5, 6, 7, 8] 
    let visualizationElements = 
    <div className="visualization-elements">
      <div className="visualization-rows">
        {count.map(row => (
          <div id={`visualization-row${row}`}>
            {count.map(col =>(
              <div id={`visualization-element${row}${col}`}/>
            ))}
            </div>
        ))}
      </div>
      <div className="visualization-columns">
        {count.map(column => (
          <div id={`visualization-column${column}`}/>
        ))}
      </div>
      <div className="visualization-boxes">
        {count.map(box => (
          <div id={`visualization-box${box}`}/>
        ))}
      </div>
    </div>

    let boardElements = convertPositionToElement(this.state.board)

    return (
      <div className="sudoku-container">
        <div className="sudoku-board">
          {boardElements}
          {visualizationElements}
        </div>
        <div className="sudoku-controls">
          <div className="button suduko-start" onClick ={this.solve}>
            <h1>
            Solve
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sudoku
