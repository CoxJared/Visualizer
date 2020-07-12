import React, { Component } from 'react'
import './Sorting.css'

const BASE_COLOR = 'rgb(16, 145, 251)';

export class Sorting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bars: [400, 340, 170, 290, 320, 240, 60, 150, 20, 100, 200]
    }
  }

  randomize() {
    const MAX = 500;
    let newShuffledBars = this.state.bars;
    for(let i = 0; i < newShuffledBars.length; i++) {
      newShuffledBars[i] = Math.floor(Math.random() * MAX);
    }
    this.setState({bars: newShuffledBars});
  }

  bubbleSort() {
    let newBars = this.state.bars
    for (let i = 0; i < newBars.length - 1; i++) {


      


      if(newBars[i] > newBars[i + 1]) {
        let tempBar = newBars[i];
        newBars[i] = newBars[i+1];
        newBars[i + 1] = tempBar;
        this.highlightbar(newBars[i], 'rgb(255, 0, 0)')
      }


    }
    console.log(newBars)
    this.setState({bars: newBars})
  }

  highlightbar(i, color) {
    setTimeout(function() {
      console.log('hi')
      document.getElementById(`bar-${i}`).style.backgroundColor = color;
    },0);
    setTimeout(function() {
      console.log('hi')
      document.getElementById(`bar-${i}`).style.backgroundColor = 'rgb(0,255,0)';
    },500);
  }

  render() {
    return (
      <div className="sorting-container">
        <div className="sorting-bars-container">
          {this.state.bars.map(bar => (
            <div className="bar-container">
              <div id={`bar-${bar}`} style={{height:bar}}/>
            </div>
          ))}
        </div>
        <div className="sorting-menu">
        <div className="shuffle-button" onClick={this.randomize.bind(this)}> 
            <h1>
              Shuffle
            </h1>
          </div>
          <div className="bubble-sort-button" onClick={this.bubbleSort.bind(this)}> 
            <h1>
              Bubble Sort
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sorting
