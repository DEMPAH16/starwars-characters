import React from 'react';

import './Input.css';

const Input = ({
    label,
    type,
    property,
    value,
    onChange,
    labelProps = {},
    inputProps = {},
    className = '',
    ...props,
}) => {
    const input = (
        <input
            {...inputProps}
            type={type}
            { ...(
                type == 'checkbox' ?
                    { checked: value } :
                    { value: value})
            }
            onChange={e => onChange(e, property)}
            name={property} />
    );
    
    const labelClass = type == 'checkbox' ? 'checkbox' : '';
    
    const labelTemplate = (
        <label className={labelClass} {...labelProps}>
            {label}:
            {input}
        </label>
    );
    
    return (
        <div className={`input-component ${className}`} {...props}>
            {label ? labelTemplate : input}
        </div>
    );
};

export default Input;