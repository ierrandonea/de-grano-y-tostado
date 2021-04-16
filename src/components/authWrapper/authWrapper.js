import React from 'react';

const AuthWrapper = ({ title, children }) => {
    return (
        < div className="card shadow w-100 authWrapper" >
            <div className="card-body">
                {title && <h5 className="card-title text-center">{title}</h5>}
                <div className="formWrap">
                    {children && children}
                </div>
            </div>
        </div >
    );
};

export default AuthWrapper;