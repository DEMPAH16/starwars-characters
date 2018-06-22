import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ItemList.css';

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
            })
            .catch(err => {
                if (err.response.status == 401) {
                    this.props.history.push('/login');
                }
            });
    }
    
    render() {
        const items = this.state.items
            .map((item, i) => (
                <Link className="no-link" to={`/character/${item.id}`} key={`item-list-${i}`}>
                    <ItemSummary
                        {...item}
                        editItem={(e) => { e.preventDefault(); this.editItem(item.id) }}
                        removeItem={(e) => {e.preventDefault(); this.removeItem(item.id) }} />
                </Link>
            ))
        
        return (
            <div className="item-list-component">
                <div className="item-list-filter">
                    <input
                        type="text"
                        value={this.state.searchText}
                        onChange={e => this.handleFilterChange(e)} />
                    
                    <Button onClick={() => this.filterItems()}>Search</Button>
                    
                    <span className="spacer"></span>
                    
                    <Link to="/character/new" className="far-right">
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
    
    filterItems() {
        axios
            .get(`/characters?search=${this.state.searchText}`)
            .then(response => {
                this.setState({
                    items: response.data,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    removeItem(id) {
        axios
            .delete(`/characters/${id}`)
            .then(() => {
                this.setState({
                    items: this.state.items.filter(c => c.id != id),
                });
            })
            .catch(err => {
                console.warn(err);
            });
    }
    
    editItem(id) {
        this.props.history.push(`/character/edit/${id}`);
    }
}

export default ItemList;