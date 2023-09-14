import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './CartSidebar.module.css'
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button/Button';
import * as CartSidebarItemCard from '../CartSidebarItemCard/CartSidebarItemCard';
import Price from '../Price/Price';

const itemProperties = () => {
    return CartSidebarItemCard.itemProperties();
}

const Component = ({
    ariaLabel,
    items,
}) => {
    let cartTotal = 0;
    let cartKeys = Object.keys(items);
    for (let i = 0; i < cartKeys.length; i++) {
        let item = items[cartKeys[i]];
        cartTotal += item.currentPrice * item.currentQuantity;
    }

    const ele = (<>
        <div className={styles["CartSidebar"]}>
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <Button
                        text="Go To Cart"
                        colour="orange"
                        width="100%"
                        rounded={false}
                        link={"Cart"}
                    />
                    <div className={styles["item-container"]} aria-label={ariaLabel}>
                    {Object.keys(items).length > 0
                        ? (<>
                            <ul className={styles["item-list"]} aria-label="shop-cart-sidebar-item-list">
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
                    <Price
                        scale={1.6}
                        original={cartTotal}
                        current={cartTotal}
                    />
                </div>
            </div>
        </div>
    </>);

    return ele;
}

Component.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
}

Component.defaultProps = {
    ariaLabel: "shop-cart-sidebar",
    items: {},
}

export { Component, itemProperties };