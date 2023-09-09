import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './ShopCart.module.css'
import { v4 as uuidv4 } from 'uuid';

const item = () => {
    return {
        id: uuidv4(),
        name: "",
    }
}

const Component = ({
    ariaLabel,
    items,
}) => {
    return (
        <>
        <ul className={styles["ShopCart"]} aria-label={ariaLabel}>
        {items.map((item) => 
            <li
                key={item.id}    
            ></li>
        )}
        </ul>
        </>
    )
}

Component.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
    })),
}

Component.defaultProps = {
    ariaLabel: "shop-cart",
    items: {},
}

export { Component, item };