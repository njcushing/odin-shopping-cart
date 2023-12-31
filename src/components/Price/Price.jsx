import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './Price.module.css'

const Price = ({
    scale,
    original,
    current,
}) => {
    const currencyFormatter = new Intl.NumberFormat('en-uk', {
        style: 'currency',
        currency: 'GBP',
    })
    const originalPriceString = currencyFormatter.format(original / 100);
    const currentPriceString = currencyFormatter.format(current / 100);
    const discountPercentageString = current !== 0
    ? `-${((1 - (current / original)) * 100).toFixed(0)}%`
    : "FREE";

    return (
        <div className={styles["Price"]}>
            <div
                className={styles["original-price"]}
                style={{
                    fontSize: `${scale * 0.5}rem`,
                }}
                aria-label="original-price"
            >
                {original !== current && originalPriceString}
            </div>
            <div
                className={styles["current-price"]}
                style={{
                    fontSize: `${scale}rem`,
                }}
                aria-label="current-price"
            >
                {currentPriceString}
            </div>
            <div
                className={styles["discount-percentage"]}
                style={{
                    fontSize: `${scale * 0.5}rem`,
                }}
                aria-label="discount-percentage"
            >
                {original !== current && discountPercentageString}
            </div>
        </div>
    );
}

Price.propTypes = {
    scale: PropTypes.number.isRequired,
    original: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
}

Price.defaultProps = {
    scale: 1.0,
    original: 0,
    current: 0,
}

export default Price;