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
}) => {
    return (
        <>
        </>
    )
};

ShopItemCard.propTypes = {
    quantity: isInteger,
}

ShopItemCard.defaultProps = {
    quantity: 0,
}

export default ShopItemCard;