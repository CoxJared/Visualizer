import React, { Component } from 'react';

import './DarkModeButton.scss';

export class DarkModeButton extends Component {
  constructor(){
    super()
    this.state = {
      light:true
    }
  }

  switch() {
    let light = !this.state.light;
    try{
     if(light){
      console.log('hi',light)
      document.getElementById('darkmode-ball').style.marginLeft = '0';
      } else {
        console.log(light)
        document.getElementById('darkmode-ball').style.marginLeft = '25px';
      }
    } catch {}
    
    this.setState({light})
  }

  render() {
    return (
      <div id="darkmode-button" onClick ={this.switch.bind(this)}>
        <div id="darkmode-ball"></div>
      </div>
    )
  }
}

export default DarkModeButton
