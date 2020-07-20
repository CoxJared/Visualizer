import React, { Component } from 'react'
import './Sorting.css'

const BASE_COLOR = 'rgb(121, 168, 177)';
const SOLVED_COLOR  = 'rgb(91, 196, 141)';
const MAX = 500;

export class Sorting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bars: [400, 340, 170, 290, 320, 240, 60, 150, 20, 100, 200, 200, 100, 400, 500, 200, 300],
      status: 'idle'
    }
  }

  randomize() {
    let newShuffledBars = this.state.bars;
    for(let i = 0; i < newShuffledBars.length; i++) {
      newShuffledBars[i] = Math.floor(Math.random() * MAX);
    }
    this.resetBarColor();
    this.setState({bars: newShuffledBars});
  }

  addBar() {
    let bars = this.state.bars
    bars.push(Math.floor(Math.random() * MAX))
    this.setState({bars});
    this.resetBarColor();
  }

  removeBar() {
    let bars = this.state.bars
    bars.pop();
    this.setState({bars});
    this.resetBarColor();
  }

  bubbleSort () {
    if(this.state.status !== 'idle') {
      return;
    } else {
      this.setState({status: 'sorting'});
    }

    let i = 0;
    let sortUntilIndex = this.state.bars.length;
    var solvingInterval = setInterval(() => {
      let newBars = this.state.bars;

      if(newBars[i] > newBars[i + 1]) {
        let tempBar = newBars[i];
        newBars[i] = newBars[i+1];
        newBars[i + 1] = tempBar;
        this.highlightbar(i, 'rgb(10, 65, 223)')
        this.setState({bars: newBars})
      } else {
        this.highlightbar(i, 'rgb(41, 77, 120)')
      }

      i++;
      if (i === sortUntilIndex){
        i = 0;
        sortUntilIndex --;
      }
      if (sortUntilIndex === 1) {
        setTimeout(() => {
          this.highlightSolvedbars();
          this.setState({status: 'idle'});
        }, 200);
        clearInterval(solvingInterval);
      }
    }, 50);
  }

  insertionSort() {
    if(this.state.status !== 'idle') {
      return;
    } else {
      this.setState({status: 'sorting'});
    }

    let newBars = this.state.bars;
    let sortUntilIndex = 1;
    let insertionInterval = setInterval(() => {
      let valueToSort = newBars[sortUntilIndex];
      this.highlightbar(sortUntilIndex, 'rgb(10, 65, 223)')

      //select value to select, loop through all previous sorted values and see where this fits
      for(let x = 0; x < sortUntilIndex; x++) {
        if(valueToSort < newBars[x]){
          newBars.splice(sortUntilIndex, 1);
          newBars.splice(x, 0, valueToSort);
          setTimeout(() => {
            this.highlightbar(x, SOLVED_COLOR)
            this.setState({bars: newBars})
            
          }, 200);
          break;
        }
      }
      
      sortUntilIndex++;
      //finished sorting
      if (sortUntilIndex === newBars.length) {
        this.highlightSolvedbars();
        clearInterval(insertionInterval);
        this.setState({status: 'idle'});
      }
    }, 500);

  }

  highlightbar(i, color) {
    setTimeout(function() {
      try{
      document.getElementById(`bar-${i}`).style.backgroundColor = color;
    }catch{}},0);
    setTimeout(function() {
      try{
      document.getElementById(`bar-${i}`).style.backgroundColor = BASE_COLOR;
      }catch{}},190);
  }

  resetBarColor(){
    for (let i = 0; i < this.state.bars.length; i++) {
      try{
        document.getElementById(`bar-${i}`).style.backgroundColor = BASE_COLOR;
      } catch {}
    }
  }
  highlightSolvedbars() {
    let i = 0;
    let highlightSolvedInterval = setInterval(() => {
      document.getElementById(`bar-${i}`).style.backgroundColor = SOLVED_COLOR;
      i++;
      if  (i === this.state.bars.length) {
        clearInterval(highlightSolvedInterval);
      }
    }, 100);
  }

  render() {
    let barCount = this.state.bars.length;
    return (
      <div className="sorting-container">
        <div className="sorting-bars-container">
          {this.state.bars.map((bar, i) => {
            return (
            <div className="bar-container" style={{width:(800 / barCount - 2) + 'px'}}>
              <div id={`bar-${i}`} style={{height:bar}}/>
            </div>)
          }
          )}
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
          <div className="bubble-sort-button" onClick={this.insertionSort.bind(this)}> 
            <h1>
              Insertion Sort
            </h1>
          </div>
          <div className="add-button" onClick={this.addBar.bind(this)}> 
            <h1>
              + 
            </h1>
          </div>
          <div className="minus-button" onClick={this.removeBar.bind(this)}> 
            <h1>
              - 
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sorting
