import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    // state = {
    //   buttonText: 'I am a button?',
    // };
    
    // props = {
    //   text: 'This text came from App',
    // };
    
    render() {
      // console.log('render');
      return (
        <button className="my-button" onClick={this.props.doThisWhenClicked}>
          {this.props.children}
          {/* {this.props.text} */}
          {/* {this.state.buttonText} */}
        </button>
      );
    }
    //#region
    // componentWillMount() {
    //   console.log('componentWillMount');
    // }
    
    // componentDidMount() {
    //   console.log('componentDidMount');
    // }
    
    // shouldComponentUpdate() {
    //   console.log('shouldComponentUpdate');
    //   return true;
    // }
    
    // componentDidUpdate() {
    //   console.log('componentDidUpdate');
    // }
    
    // componentWillReceiveProps() {
    //   console.log('componentWillReceiveProps');
    // }
    
    // componentWillUnmount() {
    //   console.log('componentWillUnmount');
    // }
    
    // refs;
    //#endregion
}

export default Button;
