import React, { Component } from 'react'
import './Sorting.css'



export class Sorting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bars: [400, 340, 170, 290, 320, 240, 60, 150, 20, 100, 200]
    }
  }



  bubbleSort() {
    let newBars = this.state.bars
    for (let i = 0; i < newBars.length - 1; i++) {
      if(newBars[i] > newBars[i + 1]) {
        let tempBar = newBars[i];
        newBars[i] = newBars[i+1];
        newBars[i + 1] = tempBar;
      }
    }
    console.log(newBars)
    this.setState({bars: newBars})
    // console.log(this.state.bars)
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
