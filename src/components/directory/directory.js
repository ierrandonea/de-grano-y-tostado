import React from 'react';
import ShopCoffee from './../../assets/shopCoffee.webp'
import ShopCoffee2 from './../../assets/shopCoffee-2.webp'
import ShopCoffee3 from './../../assets/shopCoffee-3.webp'
import ShopChocolate from './../../assets/shopChocolate.webp'
import ShopChocolate2 from './../../assets/shopChocolate-2.webp'
import ShopChocolate3 from './../../assets/shopChocolate-3.webp'

const Directory = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-12 col-md-6 card rounded-0 border-0">
                    <picture className="card-img">
                        <source media="(max-width: 767px)" srcSet={ShopCoffee2} />
                        <source media="(max-width: 991px)" srcSet={ShopCoffee3} />
                        <source media="(min-width: 992px)" srcSet={ShopCoffee} />
                        <img className="img-fluid" src={ShopCoffee} alt="" />
                    </picture>
                    <div className="d-flex justify-content-center align-items-center card-img-overlay directory-overlay">
                        <a className="btn btn-outline-light text-lg" href="/">Café</a>
                    </div>
                </div>
                <div className="col-12 col-md-6 card rounded-0 border-0">
                    <picture className="card-img">
                        <source media="(max-width: 767px)" srcSet={ShopChocolate2} />
                        <source media="(max-width: 991px)" srcSet={ShopChocolate3} />
                        <source media="(min-width: 992px)" srcSet={ShopChocolate} />
                        <img className="img-fluid" src={ShopChocolate} alt="" />
                    </picture>
                    <div className="d-flex justify-content-center align-items-center card-img-overlay directory-overlay">
                        <a className="btn btn-outline-light" href="/">Chocolate</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Directory;