import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShopItemList.module.css';

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import ShopItemCard from './../ShopItemCard/ShopItemCard';

const ShopItemList = ({
    ariaLabel,
    items,
}) => {
    return (
        <ul className={styles["ShopItemList"]} aria-label={ariaLabel}>
            {Object.keys(items).map((id) => 
                <ShopItemCard
                    item={{
                        ...ShopItemProperties(),
                        ...items[id],
                    }}
                    key={id}
                />
            )}
        </ul>
    );
}

ShopItemList.propTypes = {
    ariaLabel: PropTypes.string,
    items: PropTypes.object,
}

ShopItemList.defaultProps = {
    ariaLabel: "shop-item-list",
    items: {},
}

export default ShopItemList;

