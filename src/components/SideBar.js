import React, { Component } from 'react'

export class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-option" style={{backgroundColor:'rgb(69,154,120)'}}>
          <h1>Game of Life</h1>
        </div>
        <div className="side-bar-option" style={{backgroundColor:'rgb(215,159,135)'}}>
          <h1>Project Euler</h1>
        </div>
        <div className="side-bar-option" style={{backgroundColor:'rgb(52,123,154)'}}>
          <h1>Path Finding</h1>
        </div>
        <div className="side-bar-option" style={{backgroundColor:'rgb(207,133,40)'}}>
          <h1>Sorting</h1>
        </div>
        
      </div>
    )
  }
}

export default SideBar
