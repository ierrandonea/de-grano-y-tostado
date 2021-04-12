import React from 'react';
import Footer from '../components/footer/footer';
import Header from '../components/header';

const MainLayout = props => {
    return (
        <>
            <Header />
            <div className="content">
                {props.children}
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
