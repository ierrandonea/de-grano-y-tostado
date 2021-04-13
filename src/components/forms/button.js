import React from 'react';

const Button = ({ children, extraClasses, ...otherProps }) => {
    return (
        <button className={`btn btn-outline-primary ${extraClasses}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
