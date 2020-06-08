import React, { Component } from 'react'

export class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        
        <div className="side-bar-option button" style={{backgroundColor:'rgb(69,154,120)'}} onClick ={this.props.updateAlgorithm.bind(this,'game-of-life')}>
          <h1>Game of Life</h1>
        </div>
        <div className="side-bar-option button" style={{backgroundColor:'rgb(215,159,135)'}} onClick ={this.props.updateAlgorithm.bind(this,'sudoku')}>
          <h1>Sudoku</h1>
        </div>
        <div className="side-bar-option button" style={{backgroundColor:'rgb(52,123,154)'}} onClick ={this.props.updateAlgorithm.bind(this,'sorting')}>
          <h1>Path Finding</h1>
        </div> 
        <div className="side-bar-option button" style={{backgroundColor:'rgb(207,133,40)'}}
          onClick ={this.props.updateAlgorithm.bind(this,'sorting')}>
          <h1>Sorting</h1>
        </div>
        
        <h1 className="side-bar-heading">Projects</h1>
      </div>
    )
  }
}

export default SideBar
