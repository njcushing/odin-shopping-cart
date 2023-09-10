import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import Image from '../Image/Image';
import Price from '../Price/Price';
import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';

const itemProperties = () => {
    return {
        name: "",
        imageUrl: "",
        originalPrice: 0,
        currentPrice: 0,
        quantityMin: 0,
        quantityMax: 0,
        addToCartHandler: () => {},
    }
}

const Component = ({
    itemProperties,
}) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div className={styles["ShopItemCard"]}>
        <h4 className={styles["item-name"]}>{itemProperties.name}</h4>
        <Image url={itemProperties.imageUrl} alt={itemProperties.name} />
        <Price original={itemProperties.originalPrice} current={itemProperties.currentPrice} />
        <IntegerInput
            label="Quantity: "
            integer={quantity}
            integerMin={itemProperties.quantityMin}
            integerMax={itemProperties.quantityMax}
            onChangeHandler={(e) => {
                setQuantity(Math.floor(Number.parseInt(e.target.value)));
            }}
            outlined={true}
        />
        <Button
            text="Add to Cart"
            colour="gold"
            onClickHandler={itemProperties.addToCartHandler}
        />
        </div>
    )
};

Component.propTypes = {
    itemProperties: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        originalPrice: PropTypes.number.isRequired,
        currentPrice: PropTypes.number.isRequired,
        quantityMin: PropTypes.number.isRequired,
        quantityMax: PropTypes.number.isRequired,
        addToCartHandler: PropTypes.func.isRequired,
    }).isRequired,
}

Component.defaultProps = {
    itemProperties: PropTypes.shape({
        name: "Item Information Not Found",
        imageUrl: "",
        originalPrice: 0,
        currentPrice: 0,
        quantityMin: 0,
        quantityMax: 0,
        addToCartHandler: () => {},
    }),
}

export { Component, itemProperties };