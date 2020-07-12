import React, { Component } from 'react'
import './Sorting.css'

const BASE_COLOR = 'rgb(121, 168, 177)';

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

  bubbleSort () {
    let i = 0;
    let length = this.state.bars.length
    this.bubbleSortStep();
    var solvingInterval = setInterval(() => {
        this.bubbleSortStep(length - i - 1);
        i++;
        if (i === this.state.bars.length) {
          clearInterval(solvingInterval);
        }
    },2000);
  }

  bubbleSortStep(maxStep) {
    let newBars = this.state.bars
    
    let i = 0;
    let sortStep = setInterval(() => {

      
      if(newBars[i] > newBars[i + 1]) {
        let tempBar = newBars[i];
        newBars[i] = newBars[i+1];
        newBars[i + 1] = tempBar;
        this.highlightbar(newBars[i], 'rgb(209, 105, 43)')
        // this.highlightbar(newBars[i + 1], 'rgb(213, 88, 60)')
        this.setState({bars: newBars})
      } else {
        this.highlightbar(newBars[i], 'rgb(41, 77, 120)')
      }
      
      i++;
      if (i === maxStep) {
        clearInterval(sortStep);
      }
    }, 200);
  }

  highlightbar(i, color) {
    
    setTimeout(function() {
      try{
      console.log('hi')
      document.getElementById(`bar-${i}`).style.backgroundColor = color;
    }catch{}},0);
    setTimeout(function() {
      try{
      console.log('hi')
      document.getElementById(`bar-${i}`).style.backgroundColor = BASE_COLOR;
      }catch{}},400);
  
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
