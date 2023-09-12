import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './ShopCart.module.css'
import { v4 as uuidv4 } from 'uuid';

import * as ShopItemCard from '../ShopItemCard/ShopItemCard';

const item = () => {
    return {
        key: uuidv4(),
        name: "",
        quantity: 1,
    }
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
                        <ShopItemCard.Component
                            item={{ ...ShopItemCard.itemProperties(),
                                name: items[id].name,
                                currentQuantity: items[id].quantity,
                            }}
                            type="cartSidebar"
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

export { Component, item };