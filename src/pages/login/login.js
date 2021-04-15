import React, { Component } from 'react';
import SignIn from '../../components/signIn/signin';
import './styles.scss';

const Login = () => {
    return (
        <section className="login-section">
            <div className="container">
                <div class="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 my-5">
                        <SignIn />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
