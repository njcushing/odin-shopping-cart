import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './NumberInput.module.css';

const NumberInput = ({
    label,
    number,
    numberMin,
    numberMax,
    numberOnChangeHandler,
}) => {
    numberMin = Math.floor(Math.max(Math.min(numberMin, numberMax), 0));
    numberMax = Math.floor(Math.min(Math.max(numberMax, numberMin), Number.MAX_SAFE_INTEGER));

    number = Math.floor(Math.max(Math.min(number, numberMax), numberMin));

    return (
        <>
        <label>{label}
            <input
                type="number"
                min={numberMin}
                max={numberMax}
                className={styles["number-input"]}
                value={number}
                onChange={numberOnChangeHandler}
            ></input>
        </label>
        </>
    )
};

NumberInput.propTypes = {
    label: PropTypes.string,
    number: PropTypes.number,
    numberMin: PropTypes.number,
    numberMax: PropTypes.number,
    numberOnChangeHandler: PropTypes.func,
}

NumberInput.defaultProps = {
    label: "Number: ",
    number: 0,
    numberMin: 0,
    numberMax: 0,
    numberOnChangeHandler: () => {},
}

export default NumberInput;