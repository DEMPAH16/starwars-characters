import React, { Component } from 'react';

import Button from '../Button/Button';

class NewCharacterForm extends Component {
    inputs = [
        {
            label: 'Name',
            property: 'name',
        },
        {
            label: 'Title',
            property: 'title',
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
    
    constructor(props) {
        super(props);
        
        const character = props.character || {};
        
        this.state = {
            name: character.name || '',
            title: character.title || '',
            affilliation: character.affilliation || '',
            homePlanet: character.homePlanet || '',
        };
    }
    
    componentWillReceiveProps(props) {
        const character = props.character || {};
        
        this.setState({
            name: character.name,
            title: character.title,
            affilliation: character.affilliation,
            homePlanet: character.homePlanet,
        });
    }
    
    render() {
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
            <form name="add-character-form">
              {inputs}
              
              <Button
                  className="raised primary"
                  type="submit"
                  onClick={e => this.handleSubmit(e)}
              >
                Submit
              </Button>
              
              <Button
                  className="raised"
                  onClick={e => {e.preventDefault() ; this.props.onCancel && this.props.onCancel(e)}}
              >
                Cancel
              </Button>
            </form>
        );
    }
  
    handleChange(event, name) {
      const value = event.target.value;
      this.setState({ [name]: value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const { name, title, affilliation, homePlanet } = this.state;
        
        const newCharacter = { name, title, affilliation, homePlanet };
        
        if (this.props.onSubmit) {
            this.props.onSubmit(e, newCharacter)
                // .then(() => {
                //     this.setState({
                //         name: '',
                //         title: '',
                //         affilliation: '',
                //         homePlanet: '',
                //     });
                // });
        }
    }
}

export default NewCharacterForm;