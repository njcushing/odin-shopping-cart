import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

const ShopItemCard = ({
    quantity,
    quantityMin,
    quantityMax,
    quantityOnChangeHandler,
}) => {
    quantityMin = Math.floor(Math.max(Math.min(quantityMin, quantityMax), 0));
    quantityMax = Math.floor(Math.min(Math.max(quantityMax, quantityMin), Number.MAX_SAFE_INTEGER));

    quantity = Math.floor(Math.max(Math.min(quantity, quantityMax), quantityMin));

    return (
        <>
        <label>Quantity: 
            <input
                className={styles["quantity-input"]}
                value={quantity}
                onChange={quantityOnChangeHandler}
            ></input>
        </label>
        </>
    )
};

ShopItemCard.propTypes = {
    quantity: PropTypes.number,
    quantityMin: PropTypes.number,
    quantityMax: PropTypes.number,
}

ShopItemCard.defaultProps = {
    quantity: 0,
    quantityMin: 0,
    quantityMax: 0,
}

export default ShopItemCard;