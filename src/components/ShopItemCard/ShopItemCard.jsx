import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import Image from '../Image/Image';
import Price from '../Price/Price';
import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';

const ShopItemCard = ({
    item,
}) => {
    const itemProps = {
        ...ShopItemProperties(),
        ...item,
    }

    return (<>
        <div className={styles["ShopItemCard"]}>
        <h4 className={styles["item-name"]}>{itemProps.name}</h4>
        <Image url={itemProps.imageUrl} alt={itemProps.name} />
        <Price
            scale={2}
            original={itemProps.originalPrice}
            current={itemProps.currentPrice}
        />
        <IntegerInput
            label="Quantity: "
            integer={itemProps.currentQuantity}
            integerMin={itemProps.quantityMin}
            integerMax={itemProps.quantityMax}
            onChangeHandler={itemProps.quantityChangeHandler}
            outlined={true}
        />
        <Button
            text="Add to Cart"
            colour="gold"
            onClickHandler={itemProps.addToCartHandler}
        />
        </div>
    </>);
};

ShopItemCard.propTypes = {
    item: PropTypes.object,
}

ShopItemCard.defaultProps = {
    item: { ...ShopItemProperties(), },
}

export default ShopItemCard;