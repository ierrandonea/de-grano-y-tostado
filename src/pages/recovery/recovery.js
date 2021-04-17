import React from 'react';

import EmailPassword from '../../components/emailPassword/emailPassword';

const Recovery = () => {
    return (
        <section className="recovery-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 my-5">
                        <EmailPassword />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recovery;