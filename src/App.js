import React, { Component } from 'react';
import './App.css';

import Button from './components/Button';

class App extends Component {
  state = {
    count: 0,
  };
  
  // constructor() {
  //   super();
    
  //   this.addOne = this.addOne.bind(this);
  // }
  
  render() {
    // const button = new Button({ text: 'This text comes from App' });
    
    return (
      <div className="App">
        <Button
          // text={this.state.count}
          doThisWhenClicked={() => this.addOne()}
        >
          {this.state.count}
        </Button>
        {/* <Button /> */}
      </div>
    );
  }
  
  addOne() {
    this.setState({
      count: this.state.count + 1,
    });
  }
}

export default App;
