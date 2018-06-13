import React, { Component } from 'react';

import Button from '../Button/Button';

class NewCharacterForm extends Component {
    inputs = [
        {
            label: 'Name',
            property: 'name',
            type: 'text',
        },
        {
            label: 'Title',
            property: 'title',
            type: 'text',
        },
        {
            label: 'Affilliation',
            property: 'affilliation',
            type: 'text',
        },
        {
            label: 'Home Planet',
            property: 'home_planet',
            type: 'text',
        },
        {
            label: 'Quantity',
            property: 'quantity',
            type: 'number',
        },
        {
            label: 'Price',
            property: 'price',
            type: 'number',
        },
        {
            label: 'Image',
            property: 'image',
            type: 'text',
        },
        {
            label: 'New',
            property: 'is_new',
            type: 'checkbox',
        },
        {
            label: 'On sale',
            property: 'is_on_sale',
            type: 'checkbox',
        },
    ];
    
    constructor(props) {
        super(props);
        
        const { character } = props;
        
        this.state = this.prepareStateFromCharacter(character);
    }
    
    componentWillReceiveProps(props) {
        const { character } = props;
        
        this.setState(this.prepareStateFromCharacter(character));
    }
    
    render() {
        const inputs = this.inputs
            .map((input, i) => (
                <div key={`new-character-form-${i}`}>
                    <label>
                        {input.label}:
                        <input
                            type={input.type}
                            { ...(
                                input.type == 'checkbox' ?
                                    { checked: this.state[input.property] } :
                                    { value: this.state[input.property]})
                            }
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
      const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
      this.setState({ [name]: value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const newCharacter = this.prepareStateFromCharacter(this.state);
        
        if (this.props.onSubmit) {
            this.props.onSubmit(e, newCharacter);
        }
    }
    
    prepareStateFromCharacter(character = {}) {
        return this.inputs
            .reduce((state, input) => {
                let defaultValue;
                
                switch(input.type) {
                    case 'text': defaultValue = ''; break;
                    case 'number': defaultValue = 0; break;
                    case 'checkbox': defaultValue = false; break;
                }
                
                state[input.property] = character[input.property] || defaultValue;
                
                return state;
            }, {});
    }
}

export default NewCharacterForm;