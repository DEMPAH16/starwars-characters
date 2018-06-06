import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './ItemDetails.css';

class ItemDetails extends Component {
    state = {
        item: null,
        loading: true,
        message: '',
    };
    
    componentWillMount() {
        axios
            .get(`/characters/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    item: response.data,
                });
            })
            .catch(err => {
                console.warn(err.response.data.message);
                this.setState({
                    message: err.response.data.message,
                });
            })
            .then(() => {
                this.setState({
                    loading: false,
                });
            });
    }
    
    render() {
        const { item, loading, message } = this.state;
        
        let content;
        
        if (loading) {
            content = <p className="loading">Loading</p>;
        }
        else if (message) {
            content = <p className="error-message">{message}</p>;
        }
        else {
            content = (
                <div className="item">
                    <h2>{item.name}</h2>
                    <p className="subtext">{item.title}</p>
                    
                    <p>
                        <b>Affilliation:</b> {item.affilliation}
                    </p>
                    
                    <p>
                        <b>Home Planet:</b> {item.homePlanet}
                    </p>
                </div>
            );
        }
        
        return (
            <div className="item-details-component">
                <Link to="/">&lt;-- Back to Item List</Link>
                
                { content }
            </div>
        );
    }
}

export default ItemDetails;