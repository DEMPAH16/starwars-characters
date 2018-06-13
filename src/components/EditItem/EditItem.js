import React, { Component } from 'react';

import './EditItem.css';
import NewCharacterForm from '../NewCharacterForm/NewCharacterForm';
import axios from 'axios';

class EditItem extends Component {
    state = {
        character: null,
        isLoading: false,
    };
    
    componentWillMount() {
        this.setState({ isLoading: true });
        
        axios.get(`/characters/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ character: response.data, isLoading: false });
            })
            .catch(err => {
                console.warn(err);
                alert('Error!');
            });
    }
    
    render() {
        return (
            <div className="edit-item-component">
                <NewCharacterForm
                    character={this.state.character || {}}
                    onSubmit={(e, newCharacter) => this.handleSubmit(e, newCharacter)}
                    onCancel={() => this.handleCancel()} />
            </div>
        );
    }
    
    handleCancel() {
        this.props.history.push('/');
    }
    
    handleSubmit(e, characterUpdate) {
        axios
            .patch(`/characters/${this.props.match.params.id}`, characterUpdate)
            .then(() => {
                this.props.history.push('/');
            });
    }
}

export default EditItem;