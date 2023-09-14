import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.css';

const Cart = () => {
    return (
        <div className={styles["Cart"]} >
            <div className={styles["container"]}>
                <h1 className={styles["title"]}>Your Items</h1>
            </div>
        </div>
    )
}

Cart.propTypes = {}
Cart.defaultProps = {}

export default Cart;