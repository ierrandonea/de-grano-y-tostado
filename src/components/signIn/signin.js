import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, signInWithGoogle, resetAllAuthForms } from './../../redux/user/user.actions';
import AuthWrapper from './../authWrapper/authWrapper';

import Button from '../forms/button';
import Input from './../forms/input';

import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (currentUser) {
            setState({
                stateInitializer
            });
            props.history.push("/");
        }
    }, [currentUser])

    const stateInitializer = {
        email: '',
        password: ''
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleValidation = () => {
        const { email, password } = state;
        if (email !== '' && password !== '') return true;
        return false;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = state;
        dispatch(emailSignInStart({ email, password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        title: 'Log In'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="row">
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
                <div className="row">
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
                        <div className="recovery w-100 text-right">
                            <Link to="/recovery" className="text-info small">Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col d-flex justify-content-center">
                        <button type="submit" className={"btn btn-primary " + (handleValidation() === false ? "disabled" : "")}>Entrar</button>
                    </div>
                </div>
                <div className="row my-3 justify-content-center align-items-center">
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
                <div className="row socialMedia">
                    <div className="col">
                        <Button extraClasses="w-100" onClick={handleGoogleSignIn}><i className="fab fa-google"></i> Google</Button>
                        {/* <Button extraClasses="w-100 mt-3" onClick={signInWithGithub}><i className="fab fa-github"></i>Github</Button> */}
                    </div>
                </div>
            </form>
        </AuthWrapper>
    );
};

export default withRouter(SignIn);