import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './CartSidebar.module.css'
import { v4 as uuidv4 } from 'uuid';

import * as CartSidebarItemCard from '../CartSidebarItemCard/CartSidebarItemCard';

const itemProperties = () => {
    return CartSidebarItemCard.itemProperties();
}

const Component = ({
    ariaLabel,
    items,
}) => {
    const ele = (<>
        <div className={styles["ShopCart"]} aria-label={ariaLabel}>
        {Object.keys(items).length > 0
            ? (<>
                <ul className={styles["cart-item-list"]} aria-label="cart-item-list">
                    {Object.keys(items).map((id) => 
                        <CartSidebarItemCard.Component
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
        </div>
    </>)

    return ele;
}

Component.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
}

Component.defaultProps = {
    ariaLabel: "shop-cart",
    items: {},
}

export { Component, itemProperties };