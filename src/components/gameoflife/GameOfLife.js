import React, { Component } from 'react'
import './GameOfLife.css'

var interval
const WIDTH = 85
const HEIGHT = 45

export class GameOfLife extends Component {

  constructor() {
    super()

    let emptyBoard = this.setupEmptyBoard()
    let board  = this.setupInitialPosition(emptyBoard)
    this.state ={
      board: board,
      timer: 500,
      generation:0
    }

  console.log(this.state.board)    
  }

  setupEmptyBoard = () => {
    let board = []
    //board is 130 units wide, 70 units tall
    for(let y = 0; y < HEIGHT; y++) {
      let row =[]
      for(let x = 0; x < WIDTH; x++) {
        row.push(0)
      }
      board.push(row)
    }
    return board
  }

  setupShips = (board) => {
    //oscillator
    let oscillator = [
      [0,2],[0,3],[0,4],[0,8],[0,9],[0,10],
      [2,0],[2,5],[2,7],[2,12],
      [3,0],[3,5],[3,7],[3,12],
      [4,0],[4,5],[4,7],[4,12],
      [5,2],[5,3],[5,4],[5,8],[5,9],[5,10],
      [7,2],[7,3],[7,4],[7,8],[7,9],[7,10],
      [8,0],[8,5],[8,7],[8,12],
      [9,0],[9,5],[9,7],[9,12],
      [10,0],[10,5],[10,7],[10,12],
      [12,2],[12,3],[12,4],[12,8],[12,9],[12,10],
    ]

    let bigShip = [
      [0,1],[0,2],[0,3],[0,4],[0,5],
      [1,0],[1,5],
      [2,5],
      [3,4],[3,4],
      [4,2]
    ]

    for(let i = 0; i < oscillator.length; i++) {
      let x = 50
      let y =10
      board[ oscillator[i][0]+y][oscillator[i][1]+x] =1
    }
    for(let i = 0; i < bigShip.length; i++) {
      let x = 10
      let y =20
      board[ bigShip[i][0]+y][bigShip[i][1]+x] =1
    }

    return board
  }

  setupInitialPosition = (board) => {
    let start = [
      [0,0], [0,2],
      [1,2],
      [2,4],
      [3,4],
      [4,4],[4,6],
      [5,4],[5,6],[5,7],
      [6,6]
    ]
    for(let i = 0; i < start.length; i++) {
      let x = 40
      let y =20
      board[ start[i][0]+y][start[i][1]+x] =1
    }
    return board
  }

  continualUpdates = () => {
    if(this.state.generation === 0){
      interval = setInterval(() => {
        this.updateBoard()
      }, 200);
  }
  }

  restart = () => {
    clearInterval(interval);

    let emptyBoard = this.setupEmptyBoard()
    let board  = this.setupInitialPosition(emptyBoard)

    this.setState({board: board,
    generation: 0})
  }

  updateBoard = () => {
    let newBoard = this.applyTurn(this.state.board)
    let newGeneration = this.state.generation + 1

    this.setState({
      board:newBoard,
      generation: newGeneration})
  }

  applyTurn = (board) => {
    let newBoard = this.setupEmptyBoard()

    for(let y = 0; y < WIDTH; y++) {
      for (let x = 0; x <HEIGHT; x++){
        let neighbors = 0


          for (let addX = -1; addX < 2; addX++) {
            for (let addY = -1; addY < 2; addY++) {
              try{
                if(board[x][y] === 1 ){
                  console.log(x, y, neighbors)
                }
                 if( board[x + addX][y + addY] === 1 ) {
                neighbors ++
              }
            } catch{}
            }
          }
          //account for [x+0][y+0] case
          neighbors -= board[x][y]

          if (board[x][y] === 1 &&( neighbors === 2 | neighbors === 3)) {
            newBoard[x][y] = 1
          } else if (board[x][y] === 0 & neighbors === 3){
            newBoard[x][y] = 1
          } else {
            newBoard[x][y] = 0
          }
      }
    }

    return newBoard
  }

  mapBoardToElements = (board) => {
    let BoardElements = board.map(row => (
      <div className="row">
        {row.map(element => (
          <div className={`element ${element === 1 ? 'alive':''}`}/>
        ))}
      </div>
    ))

  return BoardElements
  }

  render() {

    let BoardElements = this.mapBoardToElements(this.state.board)
    return (
      <div className="game-of-life-container">
        
        <div className="controls">
          <div className="generation-container">
            <h1>{this.state.generation}</h1>
          </div>
          <div className="game-oflife-start-button button" onClick={this.continualUpdates}>
            <h1>Start</h1>
          </div>
          <div className="game-oflife-restart-button button" onClick={this.restart}>
            <h1>Restart</h1>
          </div>
        </div>
        <div className="display-window">
          {BoardElements}
        </div>
      </div>
    )
  }
}

export default GameOfLife
