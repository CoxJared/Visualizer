import React, { Component } from 'react'
import SideBar from './SideBar';
import GameOfLife from './gameoflife/GameOfLife';
import Sorting from './sorting/Sorting';
import Sudoku from './sudoku/Sudoku.jsx';

const algorithms = {
  'game-of-life': <GameOfLife />,
  'sudoku': <Sudoku />,
  'sorting': <Sorting />
}

export class MainPage extends Component {
  constructor() {
    super() 
    this.state = {
      algorithmDisplayed: <Sudoku/>
    }
  }

  updateAlgorithm = (newAlgorithm) => {
    this.setState({
      algorithmDisplayed: algorithms[newAlgorithm]
    })
  }


  render() {
    return (
      <div className="main-page">
        <SideBar updateAlgorithm={this.updateAlgorithm}/>
        <div className="action-window">
          {this.state.algorithmDisplayed}
        </div>
      </div>
    )
  }
}

export default MainPage
