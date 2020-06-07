import React, { Component } from 'react'
import SideBar from './SideBar';
import GameOfLife from './gameoflife/GameOfLife';

export class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <SideBar />
        <div className="action-window">
          <GameOfLife />
        </div>
      </div>
    )
  }
}

export default MainPage
