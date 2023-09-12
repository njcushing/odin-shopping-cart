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
    type,
}) => {
    switch (type) {
        case "cartMain":
            return (<>
            
            </>);
        case "cartSidebar":
            return (<>
                <div className={styles["ShopItemCard-cartSidebar"]}>
                <h4 className={styles["item-name-cartSidebar"]}>{item.name}</h4>
                <Image url={item.imageUrl} alt={item.name} />
                <Price original={item.originalPrice} current={item.currentPrice} />
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
        case "shopMain":
        default:
            return (<>
                <div className={styles["ShopItemCard-shopMain"]}>
                <h4 className={styles["item-name-shopMain"]}>{item.name}</h4>
                <Image url={item.imageUrl} alt={item.name} />
                <Price original={item.originalPrice} current={item.currentPrice} />
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
    }
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
    type: PropTypes.oneOf(["shopMain, cartMain, cartSidebar"])
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
    type: "shopMain",
}

export { Component, itemProperties };