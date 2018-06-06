import React, { Component } from 'react';

import './AddItem.css';
import NewCharacterForm from '../NewCharacterForm/NewCharacterForm';
import axios from 'axios';

class AddItem extends Component {
    render() {
        return (
            <div className="add-item-component">
                <NewCharacterForm
                    onSubmit={(e, newCharacter) => this.handleSubmit(e, newCharacter)}
                    onCancel={() => this.handleCancel()} />
            </div>
        );
    }
    
    handleCancel() {
        this.props.history.push('/');
    }
    
    handleSubmit(e, newCharacter) {
        axios
            .post('/characters', newCharacter)
            .then(() => {
                this.props.history.push('/');
            });
    }
}

export default AddItem;