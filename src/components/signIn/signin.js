import React from 'react';
import Button from '../forms/button';
import { signInWithGoogle } from './../../firebase/utils';
import './styles.scss';

const SignIn = props => {

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        < div className="card shadow w-100" >
            <div className="card-body">
                <h5 className="card-title text-center">Log In</h5>
                <div className="formWrap">
                    <form onSubmit={e => handleSubmit(e)}>
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

{/* <div>
    <form>
        <div class="row">
            <div className="col">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div className="col d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
        </div>
    </form>
    <hr className="my-4" />
    <div class="row">
        <div className="col">
            <span className="btn btn-outline-primary w-100"><i class="fab fa-google"></i> Google</span>
            <span className="btn btn-outline-primary w-100 mt-3"><i class="fab fa-github"></i> Github</span>
        </div>
    </div>
</div> */}
