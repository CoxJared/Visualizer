import React, { Component } from 'react'
import './Sudoko.css'

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
   
    this.state = {board: board}
  }

  lightUpRow = (row) => {
    document.getElementById(`visualization-row${row}`).style.backgroundColor='rgb(0, 174, 255)';
    setTimeout( function(){
      document.getElementById(`visualization-row${row}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, 400)
  }
  lightUpColumn = (row) => {
    document.getElementById(`visualization-column${row}`).style.backgroundColor='rgb(0, 174, 255)';
    setTimeout( function(){
      document.getElementById(`visualization-column${row}`).style.backgroundColor='rgba(0, 174, 255,0)';
    }, 400)
  }

  eliminateOptionsFromRows = () => {
    var i = 0
    var interval = setInterval(() => {
      this.lightUpRow(i)
      for(let x = 0; x < 9; x ++){
        if(this.state.board[i][x].value !== null){
          for(let a =0; a < 9; a++) {
            removeA(this.state.board[i][a]['options'], this.state.board[i][x].value);
            this.setState({done:"e"})
          }
        }
      }
      i++
      if(i>8){
        clearInterval(interval);
      }
    }, 500);
  }

  eliminateOptionsFromColumns = () => {
    var i = 0
    var interval2 = setInterval(() => {
      this.lightUpColumn(i)
      for(let x = 0; x < 9; x ++){
        if(this.state.board[x][i].value !== null){
          for(let a =0; a < 9; a++) {
            removeA(this.state.board[a][i]['options'], this.state.board[x][i].value);
            this.setState({done:"e"})
          }
        }
      }
      i++
      if(i>8){
        clearInterval(interval2);
      }
    }, 500);
  }

  solve = () => {
    this.eliminateOptionsFromRows()
    setTimeout(() => {
      this.eliminateOptionsFromColumns()
    },5000)
    
  }

  render() {

    let count = [0, 1, 2, 3, 4, 5, 6, 7, 8] 
    let visualizationElements = 
    <div className="visualization-elements">
      <div className="visualization-rows">
        {count.map(row => (
          <div id={`visualization-row${row}`}/>
        ))}
      </div>
      <div className="visualization-columns">
        {count.map(column => (
          <div id={`visualization-column${column}`}/>
        ))}
      </div>
      <div className="visualization-boxes">
        {count.map(box => (
          <div id={`visualization-boxes${box}`}/>
        ))}
      </div>
    </div>

    console.log(this.state.board)
    let boardElements = convertPositionToElement(this.state.board)
    console.log('done')

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
