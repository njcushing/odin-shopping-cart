import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

const isInteger = (props, propName, componentName) => {
    if (!Number.isInteger(props[propName])) {
        return new Error(`Invalid prop ${propName} passed to ShopItemCard. Expected an integer.`);
    }
}

const ShopItemCard = ({
    quantity,
    quantityMin,
    quantityMax,
    quantityOnChangeHandler,
}) => {
    quantity = Math.floor(Math.max(quantity, 0));
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    quantityMin = Math.max(Math.min(quantity, quantityMin), 0);
    quantityMax = Math.max(quantity, quantityMax);

    return (
        <>
        <label>Quantity: 
            <input
                className={styles["quantity-input"]}
                value={currentQuantity}
                onChange={(e) => {
                    setCurrentQuantity(
                        Math.floor(Math.min(Math.max(quantityMin, e.target.value), quantityMax))
                    )
                }}
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