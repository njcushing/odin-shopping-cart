import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './IntegerInput.module.css';

const IntegerInput = ({
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
                onKeyDown={(e) => {
                    if (e.key === '.') e.preventDefault();
                }}
                onChange={(e) => {
                    if (e.target.value.length === 0) e.target.value = numberMin.toString();
                    e.target.value = Math.floor(Number.parseInt(e.target.value)).toString();
                    numberOnChangeHandler(e);
                }}
            ></input>
        </label>
        </>
    )
};

IntegerInput.propTypes = {
    label: PropTypes.string,
    number: PropTypes.number,
    numberMin: PropTypes.number,
    numberMax: PropTypes.number,
    numberOnChangeHandler: PropTypes.func,
}

IntegerInput.defaultProps = {
    label: "Number: ",
    number: 0,
    numberMin: 0,
    numberMax: 0,
    numberOnChangeHandler: () => {},
}

export default IntegerInput;