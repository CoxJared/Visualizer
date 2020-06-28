import React, { Component } from 'react'

//'linear-gradient(rgb(235,255,235),rgb(69,154,120))'

const BUTTONCOLORS = [
  'rgb(92,174,243)',
  'rgb(139,180,75)',
  'rgb(236,117,77)',
  'rgb(129,110,255)',
  
]
export class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        
        <div className="side-bar-option button" 
        
        onClick ={this.props.updateAlgorithm.bind(this,'game-of-life')}>
          <h1 style={{color: BUTTONCOLORS[0]}}  >Game of Life</h1>
        </div>
        <div className="side-bar-option button" 
        onClick ={this.props.updateAlgorithm.bind(this,'sudoku')}>
          <h1 style={{color: BUTTONCOLORS[1]}}>Sudoku</h1>
        </div>
        <div className="side-bar-option button" 
        onClick ={this.props.updateAlgorithm.bind(this,'sorting')}>
          <h1 style={{color: BUTTONCOLORS[2]}}>Path Finding</h1>
        </div> 
        <div className="side-bar-option button" 
          onClick ={this.props.updateAlgorithm.bind(this,'sorting')}>
          <h1 style={{color: BUTTONCOLORS[3]}}>Sorting</h1>
        </div>
        
        {/* <h1 className="side-bar-heading">Projects</h1> */}
      </div>
    )
  }
}

export default SideBar
