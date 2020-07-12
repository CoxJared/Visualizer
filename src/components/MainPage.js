import React, { Component } from 'react'
import SideBar from './SideBar';
import GameOfLife from './gameoflife/GameOfLife';
import Sorting from './sorting/Sorting.jsx';
import Sudoku from './sudoku/Sudoku.jsx';
import DarkModeButton from './darkmodebutton/DarkModeButton';

const algorithms = {
  'game-of-life': <GameOfLife />,
  'sudoku': <Sudoku />,
  'sorting': <Sorting />
}

export class MainPage extends Component {
  constructor() {
    super() 
    this.state = {
      algorithmDisplayed: <Sorting/>
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
        {/* <DarkModeButton /> */}
      </div>
    )
  }
}

export default MainPage
