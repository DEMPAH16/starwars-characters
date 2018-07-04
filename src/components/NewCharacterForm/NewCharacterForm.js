import React, { Component } from 'react';

import './NewCharacterForm.css';

import Button from '../Button/Button';
import Input from '../Input/Input';

class NewCharacterForm extends Component {
    inputs = {
        name: {
            label: 'Name',
            property: 'name',
            type: 'text',
        },
        title: {
            label: 'Title',
            property: 'title',
            type: 'text',
        },
        affilliation: {
            label: 'Affilliation',
            property: 'affilliation',
            type: 'text',
        },
        home_planet: {
            label: 'Home Planet',
            property: 'home_planet',
            type: 'text',
        },
        quantity: {
            label: 'Quantity',
            property: 'quantity',
            type: 'number',
        },
        price: {
            label: 'Price',
            property: 'price',
            type: 'number',
        },
        image: {
            label: 'Image',
            property: 'image',
            type: 'text',
        },
        is_new: {
            label: 'New',
            property: 'is_new',
            type: 'checkbox',
        },
        is_on_sale: {
            label: 'On sale',
            property: 'is_on_sale',
            type: 'checkbox',
        },
    };
    
    constructor(props) {
        super(props);
        
        const { character } = props;
        
        this.state = this.prepareStateFromCharacter(character);
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentWillReceiveProps(props) {
        const { character } = props;
        
        this.setState(this.prepareStateFromCharacter(character));
    }
    
    render() {
        return (
            <form name="new-character-form" className="new-character-form-component">
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.name}
                        value={this.state.name}
                        className="full-width" />
                </div>
                
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.title}
                        value={this.state.title} />
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.affilliation}
                        value={this.state.affilliation} />
                </div>
                
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.home_planet}
                        value={this.state.home_planet} />
                </div>
                
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.quantity}
                        value={this.state.quantity} />
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.price}
                        value={this.state.price} />
                </div>
                
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.image}
                        value={this.state.image} />
                </div>
                
                <div className="form-row">
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.is_new}
                        value={this.state.is_new} />
                    <Input
                        onChange={this.handleChange}
                        {...this.inputs.is_on_sale}
                        value={this.state.is_on_sale} />
                </div>
                
                <div className="form-controls">
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
                </div>
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
        return Object.keys(this.inputs)
            .reduce((state, key) => {
                const input = this.inputs[key];
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