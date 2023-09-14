import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import CartItemCard from './../CartItemCard/CartItemCard';
import Button from './../Button/Button';

const Cart = ({
    ariaLabel,
    items,
}) => {
    const ele = (<>
        {Object.keys(items).length > 0
            ? (<>
                <ul className={styles["cart-item-list"]} aria-label="cart-item-list">
                    {Object.keys(items).map((id) => 
                        <CartItemCard
                            item={{
                                ...ShopItemProperties(),
                                ...items[id],
                            }}
                            key={id}
                        />
                    )}
                </ul>
            </>)
            : (
                <h4 className={styles["empty-text"]}>Your Cart is Empty</h4>
            )
        }
    </>)

    return (
        <div className={styles["Cart"]} aria-label={ariaLabel} >
            <div className={styles["container"]}>
                <h1 className={styles["title"]}>Your Items</h1>
                <Button
                    text="Return to Shop"
                    colour="orange"
                    width="12rem"
                    onClickHandler={() => {}}
                />
                {ele}
                <Button
                    text="Purchase Items"
                    colour="limegreen"
                    width="12rem"
                    onClickHandler={() => {}}
                />
            </div>
        </div>
    )
}

Cart.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
};

Cart.defaultProps = {
    ariaLabel: "shop-cart",
    items: {},
};

export default Cart;