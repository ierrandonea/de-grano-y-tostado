import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './../../redux/user/user.actions';
import { useHistory, withRouter } from 'react-router-dom';

import AutWrapper from './../authWrapper/authWrapper';
import Input from './../forms/input';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        errors: []
    })

    const stateInitializer = {
        email: '',
        errors: []
    }

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

    useEffect(() => {
        if (resetPasswordSuccess) {
            props.history.push("/")
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setState({
                ...state,
                errors: resetPasswordError
            })
        }
    }, [resetPasswordError])

    const handleSubmit = e => {
        e.preventDefault();
        const { email } = state;
        dispatch(resetPassword({ email }));
    }

    return (
        <AutWrapper {...configAuthWrapper}>
            <form onSubmit={e => handleSubmit(e)}>
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
                        <button type="submit" className={"btn btn-primary " + (handleValidation() === false ? "disabled" : "")}>Enviar</button>
                    </div>
                </div>
            </form>
        </AutWrapper>
    );
};

export default withRouter(EmailPassword);