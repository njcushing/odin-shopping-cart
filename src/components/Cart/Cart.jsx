import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import CartItemCard from './../CartItemCard/CartItemCard';
import Button from './../Button/Button';
import Price from './../Price/Price';

const Cart = ({
    ariaLabel,
    returnToShopLink,
    items,
    purchaseItemsHandler,
}) => {
    let cartTotal = 0;
    let cartKeys = Object.keys(items);
    for (let i = 0; i < cartKeys.length; i++) {
        let item = items[cartKeys[i]];
        cartTotal += item.currentPrice * item.currentQuantity;
    }

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
                    link={returnToShopLink}
                />
                <div className={styles["price-information"]}>
                    <h4 className={styles["total"]}>Total: </h4>
                    <Price
                        scale={1.6}
                        original={cartTotal}
                        current={cartTotal}
                    />
                </div>
                {ele}
                <Button
                    text="Purchase Items"
                    colour="limegreen"
                    width="12rem"
                    onClickHandler={purchaseItemsHandler}
                />
            </div>
        </div>
    )
}

Cart.propTypes = {
    ariaLabel: PropTypes.string,
    returnToShopLink: PropTypes.string,
    items: PropTypes.object,
    purchaseItemsHandler: PropTypes.func,
};

Cart.defaultProps = {
    ariaLabel: "shop-cart",
    returnToShopLink: "",
    items: {},
    purchaseItemsHandler: () => {},
};

export default Cart;