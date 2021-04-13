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
            <div class="row no-gutters">
                <div className="col-12 col-md-6 card rounded-0 border-0">
                    <picture className="card-img">
                        <source media="(max-width: 767px)" srcset={ShopCoffee2} />
                        <source media="(max-width: 991px)" srcset={ShopCoffee3} />
                        <source media="(min-width: 992px)" srcset={ShopCoffee} />
                        <img class="img-fluid" src={ShopCoffee} />
                    </picture>
                    <div className="d-flex justify-content-center align-items-center card-img-overlay directory-overlay">
                        <a className="btn btn-outline-light text-lg">Café</a>                        
                    </div>
                </div>
                <div className="col-12 col-md-6 card rounded-0 border-0">
                    <picture className="card-img">
                        <source media="(max-width: 767px)" srcset={ShopChocolate2} />
                        <source media="(max-width: 991px)" srcset={ShopChocolate3} />
                        <source media="(min-width: 992px)" srcset={ShopChocolate} />
                        <img class="img-fluid" src={ShopChocolate} />
                    </picture>
                    <div className="d-flex justify-content-center align-items-center card-img-overlay directory-overlay">
                        <a className="btn btn-outline-light">Chocolate</a>                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Directory;