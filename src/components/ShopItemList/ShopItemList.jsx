import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemList.module.css';

import * as ShopItemCard from './../ShopItemCard/ShopItemCard';

const itemProperties = () => {
    return ShopItemCard.itemProperties();
}

const Component = ({
    ariaLabel,
    items,
}) => {
    return (
        <div className={styles["ShopItemList"]} aria-label={ariaLabel}>
            {Object.keys(items).map((item) => 
                <ShopItemCard.Component
                    item={items[item]}
                    key={item}
                />
            )}
        </div>
    );
}

Component.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
}

Component.defaultProps = {
    ariaLabel: "shop-item-list",
    items: {},
}

export { Component, itemProperties }

