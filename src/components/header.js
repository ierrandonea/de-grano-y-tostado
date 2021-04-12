import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Header = props => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">De Grano y Tostado</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Comprar</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Café</a>
                                <a className="dropdown-item" href="#">Chocolate</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blog</a>
                        </li>
                    </ul>
                    <div className="dropdown-divider"></div>
                    <div className="nav-item mr-0">
                        <Link className="nav-link text-secondary" to="/login_register">Login / Registro</Link>
                    </div>
                </div>
                <div className="border-bottom text-white">
                    <i class="fas fa-shopping-cart"></i>
                    <span className="ml-2">0</span>
                </div>
            </nav>
        </header>
    );
};

export default Header;

