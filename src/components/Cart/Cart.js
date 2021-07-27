import React from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props => {
    const cartCtx = React.useContext(CartContext);
    const [isCheckout, setIsCheckout] = React.useState(false);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [didSubmitted, setDidSubmitted] = React.useState(false);
    const removeCartItemHandler = id => {
        cartCtx.removeItem(id);
    };

    const addCartItemHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const onOrderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitted(true);
        await fetch(
            'https://react-food-order-app-7ea76-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            }
        );
        cartCtx.clearCart();
        setIsSubmitted(false);
        setDidSubmitted(true);
    };

    const buttons = <div className={classes.actions}>
        <button type="button" className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button type="submit" className={classes['button']} onClick={onOrderHandler}>Order</button>}
    </div>;

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={removeCartItemHandler.bind(null, item.id)}
                onAdd={addCartItemHandler.bind(null, item)}
            />
        )}
    </ul>;

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onHideCart={props.onHideCart} />}
        {!isCheckout && buttons}
    </React.Fragment>

const isSubmittingModalContent = <p>Sending Order data....!</p>

const didSubmitModalContent = <React.Fragment>
    <p>Successfully placed the order!</p>
    <div className={classes.actions}>
        <button type="button" className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
    </div>
</React.Fragment>;

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitted && !didSubmitted && cartModalContent}
            {isSubmitted && isSubmittingModalContent}
            {!isSubmitted && didSubmitted && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;