import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';

const ShopItemCard = ({
    itemInformation,
}) => {
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");

    const previousImage = useRef(itemInformation.imageUrl);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(itemInformation.imageUrl, { mode: 'cors' });
            if (response.status >= 400) throw new Error(`${itemInformation.imageUrl} is not a link to a valid image.`);
            setImage(response.url);
        }
        fetchImage();
    }, [itemInformation.imageUrl]);

    const currencyFormatter = new Intl.NumberFormat('en-uk', {
        style: 'currency',
        currency: 'GBP',
    })
    const originalPriceString = currencyFormatter.format(itemInformation.originalPrice / 100);
    const currentPriceString = currencyFormatter.format(itemInformation.currentPrice / 100);
    const discountPercentageString = `-${((1 - (itemInformation.currentPrice / itemInformation.originalPrice)) * 100).toFixed(0)}%`;

    return (
        <div className={styles["ShopItemCard"]}>
        <h4 className={styles["item-name"]}>{itemInformation.name}</h4>
        <img className={styles["item-image"]} src={image} alt={itemInformation.name}></img>
        <div className={styles["pricing-container"]}>
            <div className={styles["original-price"]} aria-label="original-price">
                {itemInformation.originalPrice !== itemInformation.currentPrice && originalPriceString}
            </div>
            <div className={styles["current-price"]} aria-label="current-price">
                {currentPriceString}
            </div>
            <div className={styles["discount-percentage"]} aria-label="discount-percentage">
                {itemInformation.originalPrice !== itemInformation.currentPrice && discountPercentageString}
            </div>
        </div>
        <IntegerInput
            label="Quantity: "
            integer={quantity}
            integerMin={itemInformation.quantityMin}
            integerMax={itemInformation.quantityMax}
            onChangeHandler={(e) => {
                setQuantity(Math.floor(Number.parseInt(e.target.value)));
            }}
            outlined={true}
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
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        originalPrice: PropTypes.number.isRequired,
        currentPrice: PropTypes.number.isRequired,
        quantityMin: PropTypes.number.isRequired,
        quantityMax: PropTypes.number.isRequired,
    }).isRequired,
}

ShopItemCard.defaultProps = {
    itemInformation: PropTypes.shape({
        name: "Item Information Not Found",
        imageUrl: "",
        originalPrice: 0,
        currentPrice: 0,
        quantityMin: 0,
        quantityMax: 0,
    }),
}

export default ShopItemCard;