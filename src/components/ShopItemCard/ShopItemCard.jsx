import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';

const ShopItemCard = ({
    itemInformation,
}) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div className={styles["ShopItemCard"]}>
        <div></div>
        <IntegerInput
            label="Quantity: "
            integer={quantity}
            integerMin={itemInformation.quantityMin}
            integerMax={itemInformation.quantityMax}
            onChangeHandler={(e) => {
                setQuantity(Math.floor(Number.parseInt(e.target.value)));
            }}
        />
        <Button
            text="Add to Cart"
            colour="gold"
            onClickHandler={() => {

            }}
        />
        </div>
    )
};

ShopItemCard.propTypes = {
    itemInformation: PropTypes.shape({
        quantityMin: PropTypes.number,
        quantityMax: PropTypes.number,
    }).isRequired,
}

ShopItemCard.defaultProps = {
    itemInformation: PropTypes.shape({
        quantityMin: 0,
        quantityMax: 0,
    }),
}

export default ShopItemCard;