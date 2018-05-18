import React, { Component } from 'react';
import './App.css';

import Button from './components/Button';

class App extends Component {
  state = {
    count: 0,
    firstName: '',
    lastName: '',
    affilliation: '',
    homePlanet: '',
    characters: [],
  };
  
  inputs = [
    {
      label: 'First Name',
      property: 'firstName',
    },
    {
      label: 'Last Name',
      property: 'lastName',
    },
    {
      label: 'Affilliation',
      property: 'affilliation',
    },
    {
      label: 'Home Planet',
      property: 'homePlanet',
    },
  ];
  
  render() {
    const characterList = this.state.characters
      .map((c, i) => (
        <li key={`characters-${i}`}>{ c.firstName } { c.lastName } | { c.affilliation } | { c.homePlanet }</li>
      ));
    
    const inputs = this.inputs
      .map((input, i) => (
        <div key={`new-character-form-${i}`}>
          <label>
            {input.label}:
            <input
                type="text"
                value={this.state[input.property]}
                onChange={e => this.handleChange(e, input.property)}
                name={input.property} />
          </label>
        </div>
      ));
    
    return (
      <div className="App">
        <form name="add-character-form">
          {/* <label>
            Name:
            <input type="text" value={this.state.name} onChange={e => this.handleChange(e, 'name')} name="name" />
          </label><br/>
          
          <label>
            Affilliation:
            <input type="text" value={this.state.affilliation} onChange={e => this.handleChange(e, 'affilliation')} name="affilliation" />
          </label><br/>
          
          <label>
            Home planet:
            <input type="text" value={this.state.homePlanet} onChange={e => this.handleChange(e, 'homePlanet')} name="homePlanet" />
          </label><br/> */}
          
          {inputs}
          
          <button type="submit" onClick={e => this.handleSubmit(e)}>
            Submit
          </button>
        </form>
        
        <ul>
          {characterList}
        </ul>
        
        {/* <Button
            // text={this.state.count}
            doThisWhenClicked={() => this.addOne()}
        >
          Count: {this.state.count}
        </Button>
        
        <Button
            children="this.state.count"
            doThisWhenClicked={() => console.log('something different')} /> */}
      </div>
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const { firstName, lastName, affilliation, homePlanet } = this.state;
    
    const characters = [
      ...this.state.characters,
      { firstName, lastName, affilliation, homePlanet },
    ];
    
    this.setState({
      characters,
      firstName: '',
      lastName: '',
      affilliation: '',
      homePlanet: '',
    });
  }
  
  handleChange(event, name) {
    // const { target: { value } } = event;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  
  addOne() {
    this.setState({
      count: this.state.count + 1,
    });
  }
}

export default App;
