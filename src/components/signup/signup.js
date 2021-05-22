import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserStart } from './../../redux/user/user.actions';

import AuthWrapper from './../authWrapper/authWrapper';
import Input from '../forms/input';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userError: user.userError
})

const SignUp = props => {
    const { currentUser, userError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    })

    const stateInitializer = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    useEffect(() => {
        if (currentUser) {
            setState({
                stateInitializer
            });
            props.history.push("/");
        }
    }, [currentUser])

    useEffect(() => {
        if (Array.isArray(userError) && userError.length > 0) {
            setState({
                ...state,
                errors: userError
            })
        }
    }, [userError])

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

    const handleRegistSubmit = e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = state;
        dispatch(signUpUserStart({ displayName, email, password, confirmPassword }))
    }

    const configAuthWrapper = {
        title: 'Registrarse'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <form onSubmit={e => handleRegistSubmit(e)}>
                <div className="row">
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
                <div className="row">
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
                <div className="row">
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
                <div className="row">
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
                <div className="row mt-3">
                    <div className="col d-flex justify-content-center">
                        <button type="submit" className={"btn btn-primary " + (handleValidation() === false ? "disabled" : "")}>Registrarse</button>
                    </div>
                </div>
            </form>
        </AuthWrapper>
    );
};

export default withRouter(SignUp);