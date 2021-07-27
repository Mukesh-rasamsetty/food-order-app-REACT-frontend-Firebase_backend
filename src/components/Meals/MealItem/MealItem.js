import React from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/CartContext';
const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`;
    const cartCtx = React.useContext(CartContext);

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <input type="hidden" value={props.id} id="id"/>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;