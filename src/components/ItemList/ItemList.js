import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import ItemSummary from '../ItemSummary/ItemSummary';

class ItemList extends Component {
    state = {
        searchText: '',
        items: [],
    };
    
    componentWillMount() {
        axios
            .get('/characters?search=')
            .then(response => {
                this.setState({
                    items: response.data,
                });
            });
    }
    
    render() {
        const items = this.state.items
            .map((item, i) => (
                <Link to={`/character/${i}`} key={`item-list-${i}`}>
                    <ItemSummary {...item} removeItem={() => {}} />
                </Link>
            ))
        
        return (
            <div className="item-list-component">
                <div>
                    <input
                        type="text"
                        value={this.state.searchText}
                        onChange={e => this.handleFilterChange(e)} />
                    
                    <Button>Search</Button>
                    
                    <Link to="/character/new">
                        <Button className="primary raised">Add New Character</Button>
                    </Link>
                </div>
                
                <div className="item-list">
                    {items}
                </div>
            </div>
        );
    }
    
    handleFilterChange(e) {
        this.setState({
            searchText: e.target.value,
        });
    }
}

export default ItemList;