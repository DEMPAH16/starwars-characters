import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { updateTheme } from '../../redux/actions/user-actions';

class Themer extends Component {
    
    constructor(props) {
        super(props);
        
        const { headerBackgroundColor, defaultButtonColor } = props;
        
        this.state = {
            headerBackgroundColor,
            defaultButtonColor,
        };
    }
    
    render() {
        return (
            <div className="themer-component">
                <form onSubmit={e => this.updateTheme(e)}>
                    <input
                        type="text"
                        placeholder="Header Color"
                        onChange={e => this.handleChange('headerBackgroundColor', e.target.value)}
                        value={this.state.headerBackgroundColor} />
                    
                    <input
                        type="text"
                        placeholder="Default Button Color"
                        onChange={e => this.handleChange('defaultButtonColor', e.target.value)}
                        value={this.state.defaultButtonColor} />
                    
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
    
    handleChange(field, value) {
        this.setState({ [field]: value });
    }
    
    updateTheme(e) {
        e.preventDefault();
        
        this.props.updateTheme(this.state);
    }
}

export default connect(({
    headerBackgroundColor,
    defaultButtonColor
}) => ({
    headerBackgroundColor,
    defaultButtonColor,
}), { updateTheme })(Themer);