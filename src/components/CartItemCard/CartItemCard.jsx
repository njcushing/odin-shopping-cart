import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CartItemCard.module.css';

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import Image from '../Image/Image';
import Price from '../Price/Price';
import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';

const CartItemCard = ({
    item,
}) => {
    const itemProps = {
        ...ShopItemProperties(),
        ...item,
    }

    return (<>
        <div className={styles["CartItemCard"]}>
        <div className={styles["image-container"]}>
            <Image url={itemProps.imageUrl} alt={itemProps.name} />
        </div>
        <div className={styles["information-container"]}>
            <h4 className={styles["item-name"]}>{itemProps.name}</h4>
            <Price
                original={itemProps.currentPrice * itemProps.currentQuantity}
                current={itemProps.currentPrice * itemProps.currentQuantity}
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
                text="Remove From Cart"
                colour="red"
                scale={0.8}
                onClickHandler={itemProps.removeFromCartHandler}
            />
            </div>
        </div>
    </>);
};

CartItemCard.propTypes = {
    item: PropTypes.object,
}

CartItemCard.defaultProps = {
    item: { ...ShopItemProperties(), },
}

export default CartItemCard;