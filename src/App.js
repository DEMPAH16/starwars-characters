import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import NewCharacterForm from './components/NewCharacterForm';
import Button from './components/Button';

class App extends Component {
  state = {
    character: null,
    characterIndex: -1,
    makeNewCharacter: false,
    characters: [],
    // planets: [],
  };
  
  componentWillMount() {
    axios.get('http://localhost:3002/characters')
      .then(response => {
        this.setState({
          characters: [
            ...response.data,
          ],
        })
      })
      .catch(err => console.warn(err));
    
    // axios.get('https://swapi.co/api/planets/')
    //   .then(response => {
    //     this.setState({
    //       planets: [
    //         ...response.data.results,
    //       ]
    //     })
    //   })
    //   .catch(err => console.warn(err));
  }
  
  render() {
    const characterList = this.state.characters
      .map((c, i) => (
        <li
            key={`characters-${i}`}
            onClick={() => this.editCharacter(c, i)}
        >
          { c.name } | { c.title } | { c.affilliation } | { c.homePlanet }
          <br />
          <Button onClick={e => {e.stopPropagation() ; this.deleteCharacter(i)}}>Remove</Button>
        </li>
      ));
      
    // const planetList = this.state.planets.map((p, i)=> (
    //   <li key={`planets-${i}`}>{ p.name } | { p.population }</li>
    // ));
    
    const newCharacterForm = (this.state.makeNewCharacter || this.state.character) &&
        <NewCharacterForm
            character={this.state.character || {}}
            onSubmit={
              this.state.character ?
                (e, update) => this.updateCharacter(e, update) :
                (e, nc) => this.handleSubmit(e, nc)
            } />;
    
    return (
      <div className="App">
        {
          (!this.state.makeNewCharacter && !this.state.character) &&
            <Button onClick={() => this.showNewCharacterForm()}>
              Add a New Character
            </Button>
        }
        
        { newCharacterForm }
        
        <ul>
          {characterList}
        </ul>
        {/* <ol>
          {planetList}
        </ol> */}
      </div>
    );
  }
  
  handleSubmit(e, newCharacter) {
    e.preventDefault();
    
    return axios.post('/characters', newCharacter)
      .then(response => {
        const characters = [
          ...this.state.characters,
          response.data,
        ];
        
        this.setState({
          characters,
          makeNewCharacter: false,
        });
      })
      .catch(err => {
        console.warn('character couldn\'t be added');
        console.info(err);
        throw err;
      });
  }
  
  showNewCharacterForm() {
    this.setState({
      makeNewCharacter: true,
    });
  }
  
  editCharacter(character, index) {
    this.setState({
      character,
      characterIndex: index,
    });
  }
  
  updateCharacter(e, character) {
    return axios.patch('/characters/' + this.state.characterIndex, character)
      .then(response => {
        const characters = this.state.characters.slice();
        
        characters[this.state.characterIndex] = response.data;
        
        this.setState({
          character: null,
          characterIndex: -1,
          characters,
        });
      })
  }
  
  deleteCharacter(index) {
    axios.delete('/characters/' + index)
      .then(() => {
        this.setState({
          characters: this.state.characters.filter((c, i) => i != index),
        });
      });
  }
}

export default App;
