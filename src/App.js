import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import NewCharacterForm from './components/NewCharacterForm';
import Button from './components/Button';
import Header from './components/Header';
import ItemSummary from './components/ItemSummary';
class App extends Component {
  state = {
    character: null,
    characterIndex: -1,
    makeNewCharacter: false,
    characters: [],
    // planets: [],
  };
  
  componentWillMount() {
    axios.get('http://localhost:3002/characters?search=')
      .then(response => {
        this.setState({
          characters: [
            ...response.data,
          ],
        })
      })
      .catch(err => console.warn(err));
    
  }
  
  render() {
    const characterList = this.state.characters
      .map((c, i) => (
        
        <ItemSummary 
            name = {c.name}  
            title = {c.title}
            affilliation= {c.affilliation}
            homePlanet= {c.homePlanet}
            key={`items-${i}`}
            clickItem={() => this.editCharacter(c, i)}
            removeItem= {e => {e.stopPropagation() ; this.deleteCharacter(i)}}
        />
        
      ));
      
    // const planetList = this.state.planets.map((p, i)=> (
    //   <li key={`planets-${i}`}>{ p.name } | { p.population }</li>
    // ));
    
    const newCharacterForm = (this.state.makeNewCharacter || this.state.character) &&
        <NewCharacterForm
            title={this.state.character ? '' : ''}
            character={this.state.character || {}}
            onSubmit={
              this.state.character ?
                (e, update) => this.updateCharacter(e, update) :
                (e, nc) => this.handleSubmit(e, nc)
            }
            onCancel={
              () => this.state.character ? 
                this.cancelUpdateCharacter() :
                this.hideNewCharacterForm()
            } />;
    
    return (
      <div className="App">
      
        <Header></Header>
        
        <form onSubmit={e => this.filterCharacters(e)}>
          <input ref="query" name="search" />
          
          <Button type="submit">Submit</Button>
        </form>
      
        {
          (!this.state.makeNewCharacter && !this.state.character) &&
            <Button onClick={() => this.showNewCharacterForm()} className="raised primary">
              Add a New Character
            </Button>
        }
        
        { newCharacterForm }
        
        {
          !this.state.character && !this.state.makeNewCharacter &&
            <ul className="item-list">
              {characterList}
            </ul>
        }
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
  
  hideNewCharacterForm() {
    this.setState({
      makeNewCharacter: false,
    });
  }
  
  editCharacter(character, index) {
    this.setState({
      character,
      characterIndex: index,
    });
  }
  
  cancelUpdateCharacter() {
    this.setState({
      character: null,
      characterIndex: -1,
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
  
  filterCharacters(e) {
    e.preventDefault();
    
    axios.get(`/characters?search=${this.refs.query.value}`)
      .then(response => {
        this.setState({
          characters: response.data,
        });
      })
      .catch(err => {
        console.info(err);
      });
  }
}

export default App;
