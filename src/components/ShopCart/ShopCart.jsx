import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './ShopCart.module.css'
import { v4 as uuidv4 } from 'uuid';

const item = () => {
    return {
        key: uuidv4(),
        name: "",
    }
}

const Component = ({
    ariaLabel,
    items,
}) => {
    const ele = (<>
        <div className={styles["ShopCart"]} aria-label={ariaLabel}>
        {Object.keys(items).length > 0
            ? (
                <ul className={styles["cart-item-list"]}>
                    {Object.keys(items).map((itemId) => 
                        <li
                            className={styles["cart-item"]}
                            key={items[itemId].key}    
                        >{items[itemId].name}</li>
                    )}
                </ul>
            )
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
    items: PropTypes.shape(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
    })),
}

Component.defaultProps = {
    ariaLabel: "shop-cart",
    items: {},
}

export { Component, item };