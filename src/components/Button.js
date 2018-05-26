import React from 'react';
import './Button.css';

// const Button = (props) => {
//   const { children, className, ...rest } = props;
const Button = ({ children, className, ...rest }) => (
    <button {...rest} className={`sw-button ${ className || '' }`}>
      {children}
    </button>
);

export default Button;
