import React, { Component } from 'react'
import './Sorting.css'

const BASE_COLOR = 'rgb(121, 168, 177)';
const SOLVED_COLOR  = 'rgb(91, 196, 141)';
const HIGHER_COLOR = 'rgb(10, 65, 223)'
const LOWER_COLOR = 'rgb(10, 65, 123)';
const MAX = 500;

function randomColor(){
  return `rgb(${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 255))})`;
}

export class Sorting extends Component {
  constructor(props) {
    super(props)
    let startingBars = []
    for(let i = 0; i < 100; i++) {
      startingBars.push(Math.floor(Math.random() * MAX));
    }

    this.state = {
      bars: startingBars,
      status: 'idle'
    }
  }

  randomize() {
    this.killSorting();
    let newShuffledBars = this.state.bars;

    let i = 0;
    let randomizeInterval = setInterval(() => {
      newShuffledBars[i] = Math.floor(Math.random() * MAX);
      this.highlightbar(i, randomColor(), 70);
      this.setState({bars: newShuffledBars});

      i++;
      if (i === newShuffledBars.length){
        clearInterval(randomizeInterval);
      }

    },20);
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

  killSorting() {
    var noofTimeOuts = setInterval(() => {console.log('')},0);
    for (var i = 0 ; i <= noofTimeOuts ; i++) {
      clearInterval(i);
      console.log(i);
    }
    this.resetBarColor();
  }

  bubbleSort () {
    this.killSorting();

    let i = 0;
    let sortUntilIndex = this.state.bars.length;
    var solvingInterval = setInterval(() => {
      let newBars = this.state.bars;

      if(newBars[i] > newBars[i + 1]) {
        let tempBar = newBars[i];
        newBars[i] = newBars[i+1];
        newBars[i + 1] = tempBar;
        this.highlightbar(i, 'rgb(10, 65, 223)', 50)
        this.setState({bars: newBars})
      } else {
        this.highlightbar(i, 'rgb(41, 77, 120)', 50)
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
    }, 10);
  }

  insertionSort() {
    this.killSorting();

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

  quickSortStart() {
    this.killSorting();

    let arr = this.state.bars;
    this.quickSort(arr);
  }

  quickSort(arr, left = 0, right = this.state.bars.length - 1) {
    if(left >= right){
      return;
    }

    let pivotIndex = Math.floor((left + right) / 2);
    let pivot = arr[pivotIndex];

    let sectionColor = randomColor();
    for(let i = left; i <  right + 1; i++){
      this.highlightbar(i, sectionColor, 400);
    }
    // this.highlightbar(pivotIndex, 'rgb(200, 200, 50)', 300);

    setTimeout(() => {
      let point = this.quickSortStep(arr, left, right, pivot);
      this.setState({bars: arr});
      setTimeout(() => {
        this.quickSort(arr, left, point - 1);

        this.quickSort(arr, point, right);
      }, 600);
    }, 200);

  }

  quickSortStep(arr, left, right, pivot) {
    while (left <= right) {
      while(arr[left] < pivot){
        left++;
      }
      while(arr[right] > pivot){
        right--;
      }

      if(left <= right){
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
      }
    }
    return left;
  }

  mergeSortStart() {
    let arr = this.state.bars;
    let temp = [...arr];
    console.log(temp);
    this.mergeSort(arr, temp, 0, arr.length - 1);
    this.setState({bars: arr});
    console.log('done');
  }

  mergeSort(arr, temp, leftStart, rightEnd) {
    if (leftStart >= rightEnd) {
      return;
    }
    let middle = Math.floor((leftStart + rightEnd) / 2);
    this.mergeSort(arr, temp, leftStart, middle);
    this.mergeSort(arr, temp, middle + 1, rightEnd);
    console.log(leftStart);
    this.mergeHalves(arr, temp, leftStart, rightEnd);
  }

  mergeHalves(arr, temp, leftStart, rightEnd) {
    let leftEnd = Math.floor((rightEnd + leftStart) / 2);
    let rightStart = leftEnd + 1;
    let size = rightEnd - leftStart + 1;

    let left = leftStart;
    let right = rightStart;
    let index = leftStart;

    while(left <= leftEnd && right <= rightEnd) {
      if(arr[left] <= arr[right]) {
        temp[index] = arr[left];
        left++;
      } else {
        temp[index] = arr[right];
        right++; 
      }
      index++;
    }
    for (let x = 0; x < leftEnd - left + 1; x++) {
      temp[index + x] = arr[left + x];
    }
    for (let x = 0; x < rightEnd - right + 1; x++) {
      temp[index + x] = arr[right + x];
    } 
    for (let x = 0; x < size; x++) {
      temp[leftStart  + x] = arr[leftStart + x];
    } 
  }

  highlightbar(i, color, timeout = 190) {
    setTimeout(function() {
      try{
      document.getElementById(`bar-${i}`).style.backgroundColor = color;
    }catch{}},0);
    setTimeout(function() {
      try{
      document.getElementById(`bar-${i}`).style.backgroundColor = BASE_COLOR;
      }catch{}},timeout);
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
          <div className="add-minus-container">
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
          <div className="sorting-button bubble-sort-button" onClick={this.bubbleSort.bind(this)}> 
            <h1>
              Bubble Sort
            </h1>
          </div>
          <div className="sorting-button insertion-sort-button" onClick={this.insertionSort.bind(this)}> 
            <h1>
              Insertion Sort
            </h1>
          </div>
          <div className="sorting-button quick-sort-button" onClick={this.quickSortStart.bind(this)}> 
            <h1>
              Quick Sort
            </h1>
          </div>
          <div className="sorting-button merge-sort-button" onClick={this.mergeSortStart.bind(this)}> 
            <h1>
              Merge Sort
            </h1>
          </div>
          <div className="kill-button" onClick={this.killSorting.bind(this)}> 
            <h1>
              Kill Sorting
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Sorting
