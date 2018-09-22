import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Button from '../Button/Button';
import { LOGIN } from '../../redux/actions/user-actions';

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    };
    
    render() {
        if (this.props.currentUser.username) {
            return <Redirect to="/" />;
        }
        
        return (
            <div className="login-page-component">
                <form className="login-box" onSubmit={e => this.handleSubmit(e)}>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={e => this.handleChange('username', e.target.value)}
                                value={this.state.username} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name=""
                                id="password"
                                onChange={e => this.handleChange('password', e.target.value)}
                                value={this.state.password} />
                        </div>
                    </div>
                    <Button className="raised primary" type="submit">Log in</Button>
                </form>
                
                <Link to="/register">Don't have an account? Register!</Link>
            </div>
        );
    }
    
    
    handleSubmit(e) {
        e.preventDefault();
        
        axios
            .post('/auth/login', this.state)
            .then(response => {
                this.props.dispatch({
                    type: LOGIN,
                    payload: response.data,
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.warn(err);
            });
    }
}

export default connect(({ currentUser }) => ({ currentUser }))(LoginPage);