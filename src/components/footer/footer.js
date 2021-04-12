import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Footer = props => {
    return (
        <div className="container-fluid bg-primary text-white py-4">
                <span>© 2021 De Grano y Tostado</span>
        </div>
    );
};

export default Footer;
