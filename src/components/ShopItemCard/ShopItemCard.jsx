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
        currentQuantity: 0,
        quantityChangeHandler: () => {},
        addToCartHandler: () => {},
    }
}

const Component = ({
    item,
}) => {
    return (<>
        <div className={styles["ShopItemCard"]}>
        <h4 className={styles["item-name"]}>{item.name}</h4>
        <Image url={item.imageUrl} alt={item.name} />
        <Price
            scale={2}
            original={item.originalPrice}
            current={item.currentPrice}
        />
        <IntegerInput
            label="Quantity: "
            integer={item.currentQuantity}
            integerMin={item.quantityMin}
            integerMax={item.quantityMax}
            onChangeHandler={item.quantityChangeHandler}
            outlined={true}
        />
        <Button
            text="Add to Cart"
            colour="gold"
            onClickHandler={item.addToCartHandler}
        />
        </div>
    </>);
};

Component.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        originalPrice: PropTypes.number.isRequired,
        currentPrice: PropTypes.number.isRequired,
        quantityMin: PropTypes.number.isRequired,
        quantityMax: PropTypes.number.isRequired,
        currentQuantity: PropTypes.number.isRequired,
        quantityChangeHandler: PropTypes.func.isRequired,
        addToCartHandler: PropTypes.func.isRequired,
    }).isRequired,
}

Component.defaultProps = {
    item: {
        name: "Item Information Not Found",
        imageUrl: "",
        originalPrice: 0,
        currentPrice: 0,
        quantityMin: 0,
        quantityMax: 0,
        currentQuantity: 0,
        quantityChangeHandler: () => {},
        addToCartHandler: () => {},
    },
}

export { Component, itemProperties };