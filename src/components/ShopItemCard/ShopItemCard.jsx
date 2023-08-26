import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import NumberInput from '../NumberInput/NumberInput';

const ShopItemCard = ({
    itemInformation,
}) => {
    return (
        <>
        <NumberInput
            label="Quantity: "
            quantity={0}
            quantityMin={itemInformation.quantityMin}
            quantityMax={itemInformation.quantityMax}
            quantityOnChangeHandler={itemInformation.quantityOnChangeHandler}
        />
        </>
    )
};

ShopItemCard.propTypes = {
    itemInformation: PropTypes.shape({
        quantityMin: PropTypes.number,
        quantityMax: PropTypes.number,
        quantityOnChangeHandler: PropTypes.func,
    }).isRequired,
}

ShopItemCard.defaultProps = {
    itemInformation: PropTypes.shape({
        quantityMin: 0,
        quantityMax: 0,
        quantityOnChangeHandler: null,
    }),
}

export default ShopItemCard;