import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemCard.module.css';

import IntegerInput from '../IntegerInput/IntegerInput';
import Button from '../Button/Button';
import Price from '../Price/Price';

const ShopItemCard = ({
    itemInformation,
}) => {
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);

    const previousImage = useRef(itemInformation.imageUrl);

    useEffect(() => {
        fetch(itemInformation.imageUrl, { mode: 'cors' })
            .then((response) => { if (response.status >= 400) throw new
                Error(`itemInformation.imageUrl} is not a link to a valid image.`);
                return response; 
            })
            .then((response) => setImage(response.url))
            .catch((error) => { setError(error) });
    }, [itemInformation.imageUrl]);

    return (
        <div className={styles["ShopItemCard"]}>
        <h4 className={styles["item-name"]}>{itemInformation.name}</h4>
        <img className={styles["item-image"]} src={image} alt={itemInformation.name}></img>
        <Price original={itemInformation.originalPrice} current={itemInformation.currentPrice} />
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