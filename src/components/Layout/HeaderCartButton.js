import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';
const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = React.useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const noOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    React.useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{noOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;