import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Button from '../Button/Button';

class User extends Component {
    render() {
        return (
            <div>
                <Link to={this.props.match.url + '/info'}><Button>Info</Button></Link>
                <Link to={this.props.match.url + '/payment-methods'}><Button>Payment Methods</Button></Link>
                
                <Route path={this.props.match.url + '/info'} render={props => <p>user-info</p>} />
                <Route path={this.props.match.url + '/payment-methods'} render={props => <p>user-payment-methods</p>} />
            </div>
        );
    }
}

export default User;