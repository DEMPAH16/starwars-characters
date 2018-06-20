import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import ItemList from './components/ItemList/ItemList';
import Header from './components/Header/Header';
import AddItem from './components/AddItem/AddItem';
import ItemDetails from './components/ItemDetails/ItemsDetails';
import User from './components/User/User';
import EditItem from './components/EditItem/EditItem';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-component">
          <Header />
          
          <Switch>
            <Route path="/" exact component={ItemList} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/user" component={User} />
            <Route path="/character/new" component={AddItem} />
            <Route path="/character/edit/:id" component={EditItem} />
            <Route path="/character/:id" component={ItemDetails} />
            {/* <Route render={() => <Redirect to="/" />} /> */}
            <Route render={() => <p>Not found</p>} />
          </Switch>
        </div>
      </Router>
    );
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
