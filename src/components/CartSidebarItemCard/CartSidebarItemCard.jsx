import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CartSidebarItemCard.module.css';

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
        removeFromCartHandler: () => {},
    }
}

const Component = ({
    item,
}) => {
    return (<>
        <div className={styles["CartSidebarItemCard"]}>
        <div className={styles["image-container"]}>
            <Image url={item.imageUrl} alt={item.name} />
        </div>
        <div className={styles["information-container"]}>
            <h4 className={styles["item-name"]}>{item.name}</h4>
            <Price
                original={item.currentPrice * item.currentQuantity}
                current={item.currentPrice * item.currentQuantity}
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
                text="Remove From Cart"
                colour="red"
                scale={0.8}
                onClickHandler={item.removeFromCartHandler}
            />
            </div>
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
        removeFromCartHandler: PropTypes.func.isRequired,
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
        removeFromCartHandler: () => {},
    },
}

export { Component, itemProperties };