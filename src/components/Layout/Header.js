import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Our Meals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="<h3>Hi, Welcome All...!</h3>" />
            </div>
        </React.Fragment>
    );
};

export default Header;