import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';

import * as CartItemCard from './../CartItemCard/CartItemCard';

const itemProperties = () => {
    return CartItemCard.itemProperties();
}

const Component = ({
    ariaLabel,
    items,
}) => {
    const ele = (<>
        {Object.keys(items).length > 0
            ? (<>
                <ul className={styles["cart-item-list"]} aria-label="cart-item-list">
                    {Object.keys(items).map((id) => 
                        <CartItemCard.Component
                            item={items[id]}
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
                {ele}
            </div>
        </div>
    )
}

Component.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
};

Component.defaultProps = {
    ariaLabel: "shop-cart",
    items: {},
};

export { Component, itemProperties };