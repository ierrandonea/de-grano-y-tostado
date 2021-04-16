import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from './../../firebase/utils';

import AutWrapper from './../authWrapper/authWrapper';
import Input from './../forms/input';

const initialState = {
    email: '',
    errors: []
}

const EmailPassword = () => {
    const [state, setState] = useState({
        email: '',
        errors: []
    })

    let history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleValidation = () => {
        const { email } = state;
        if (email !== '') return true;
        return false;
    }

    const configAuthWrapper = {
        title: 'Recuperar Contraseña'
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { email } = state;
        const config = {
            url: 'http://localhost:3000/login'
        };
        try {
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log("Password Reset");
                    history.push("/login")
                })
                .catch(() => {
                    const error = ['Email no encontrado. Por favor intenta de nuevo.'];
                    setState({
                        ...state,
                        errors: error
                    });
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <AutWrapper {...configAuthWrapper}>
            <form onSubmit={e => handleSubmit(e)}>
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
                    <div className="col d-flex flex-column">
                        {
                            state.errors.length > 0 && state.errors.map((err, i) => {
                                return (
                                    <span className={"text-danger small " + (i > 0 ? "mt-2" : "")} key={i}>{err}</span>
                                );
                            })
                        }
                    </div>
                </div>
                <div class="row mt-3">
                    <div className="col d-flex justify-content-center">
                        <button type="submit" className={"btn btn-primary " + (handleValidation() == false ? "disabled" : "")}>Enviar</button>
                    </div>
                </div>
            </form>
        </AutWrapper>
    );
};

export default EmailPassword;