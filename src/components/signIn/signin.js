import React, { useState } from 'react';
import Button from '../forms/button';
import Input from './../forms/input';

import { signInWithGoogle, auth } from './../../firebase/utils';
import './styles.scss';

const initialState = {
    email: '',
    password: ''
}

const SignIn = props => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setState({
                initialState
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        < div className="card shadow w-100" >
            <div className="card-body">
                <h5 className="card-title text-center">Log In</h5>
                <div className="formWrap">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div class="row">
                            <div className="col-12">
                                <Input
                                    type="email"
                                    name="email"
                                    value={state.email}
                                    label="Email"
                                    id="loginEmail"
                                    placeholder="ejemplo@mail.com"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-12">
                                <Input
                                    type="password"
                                    name="password"
                                    value={state.password}
                                    label="Contraseña"
                                    id="loginPassword"
                                    placeholder="contraseña"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </div>
                        </div>
                        <div class="row my-3 justify-content-center align-items-center">
                            <div className="col-4">
                                <hr />
                            </div>
                            <div className="col-3 text-center">
                                entrar con
                            </div>
                            <div className="col-4">
                                <hr />
                            </div>
                        </div>
                        <div class="row socialMedia">
                            <div className="col">
                                <Button extraClasses="w-100" onClick={signInWithGoogle}><i className="fab fa-google"></i> Google</Button>
                                {/* <Button extraClasses="w-100 mt-3" onClick={signInWithGithub}><i className="fab fa-github"></i>Github</Button> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default SignIn;