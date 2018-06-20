import React from 'react';
import { connect } from 'react-redux';
import './Button.css';

const Button = ({ dispatch, defaultButtonColor, children, className = '', ...rest }) => (
    <button
        {...rest}
        className={`sw-button ${ className || '' }`}
        style={{
            backgroundColor: (
              !className.includes('primary') || !className.includes('warn')
            ) && defaultButtonColor,
        }}
      >
      {children}
    </button>
);

export default connect(({defaultButtonColor}) => ({ defaultButtonColor }))(Button);
