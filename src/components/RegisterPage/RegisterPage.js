import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.css';
import axios from 'axios';
import Button from '../Button/Button';

class RegisterPage extends Component {
    state = {
        username: '',
        password: '',
    };
    
    render() {
        return (
            <div className="register-page-component">
                <form className="register-box" onSubmit={e => this.handleSubmit(e)}>
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
                    <Button type="submit">Register</Button>
                </form>
                
                <Link to="/login">Already have an account? Log in!</Link>
            </div>
        );
    }
    
    handleChange(field, value) {
        this.setState({ [field]: value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        axios
            .post('/register', this.state)
            .then(user => {
                //?
            })
            .catch(err => {
                console.warn(err);
            });
    }
}

export default RegisterPage;