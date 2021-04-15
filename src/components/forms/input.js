import React from 'react';

const Input = ({ label, extraClasses, id, handleChange, ...otherProps }) => {
    return (
        <div className="form-group">
            {
                label && (
                    <label for={id}>{label}</label>
                )
            }
            <input className={`form-control ${extraClasses}`} id={id} onClick={handleChange} {...otherProps} />
        </div>
    );
};

export default Input;