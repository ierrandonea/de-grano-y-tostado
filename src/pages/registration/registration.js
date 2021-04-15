import React, { Component } from 'react';
import SignUp from '../../components/signup/signup';
import './styles.scss';

const Registration = () => {
    return (
        <section className="register-section">
            <div className="container">
                <div class="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 my-5">
                        <SignUp />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
