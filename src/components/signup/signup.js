import React, { useState } from 'react';
import Input from '../forms/input';

import { auth, handleUserProfile } from './../../firebase/utils';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

const SignUp = props => {
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    })

    const handleChange = e => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    const handleValidation = () => {
        const { displayName, email, password, confirmPassword } = state;
        if (displayName !== '' && email !== '' && password !== '' && confirmPassword !== '') return true;
        return false;
    }

    const handleRegistSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = state;
        if (password !== confirmPassword) {
            const error = ['Las contraseñas no coinciden']
            setState({
                ...state,
                errors: error
            })
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            setState({
                initialState
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        < div className="card shadow w-100" >
            <div className="card-body">
                <h5 className="card-title text-center">Registrate</h5>
                <div className="formWrap">
                    <form onSubmit={e => handleRegistSubmit(e)}>
                        <div class="row">
                            <div className="col">
                                <Input
                                    type="email"
                                    name="email"
                                    value={state.email}
                                    label="Email"
                                    id="registrationEmail"
                                    placeholder="Ingresa tu email"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-12">
                                <Input
                                    type="text"
                                    name="displayName"
                                    value={state.displayName}
                                    label="Nombre"
                                    id="registrationDisplayName"
                                    placeholder="Nombre Apellido"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            {/* <div className="col-12 col-md-6">
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={state.lastName}
                                    label="Apellido"
                                    id="registrationLastName"
                                    onChange={e => handleChange(e)}
                                />
                            </div> */}
                        </div>
                        <div class="row">
                            <div className="col-12 col-md-6">
                                <Input
                                    type="password"
                                    name="password"
                                    value={state.password}
                                    label="Contraseña"
                                    id="registrationPassword"
                                    placeholder="contraseña"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={state.confirmPassword}
                                    label="Confirmar Contraseña"
                                    id="registrationConfirmPassword"
                                    placeholder="confirmar contraseña"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div className="col">
                                {
                                    state.errors.length > 0 && state.errors.map((err, i) => {
                                        return (
                                            <span className={"text-danger small " + (i !== 0 ? "mt-2" : "")} key={i}>{err}</span>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <button type="submit" className={"btn btn-primary " + (handleValidation() == false ? "disabled" : "")}>Registrarse</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default SignUp;