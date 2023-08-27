import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './IntegerInput.module.css';

const IntegerInput = ({
    label,
    integer,
    integerMin,
    integerMax,
    onChangeHandler,
    width,
    outlined,
}) => {
    integerMin = Math.floor(Math.max(Math.min(integerMin, integerMax), 0));
    integerMax = Math.floor(Math.min(Math.max(integerMax, integerMin), Number.MAX_SAFE_INTEGER));

    integer = Math.floor(Math.max(Math.min(integer, integerMax), integerMin));

    return (
        <div className={styles["IntegerInput"]}>
            <label
                className={styles["label"]}
                style={{ width: width }}
            >{label}
                <input
                    type="number"
                    min={integerMin}
                    max={integerMax}
                    className={styles["input"]}
                    value={integer}
                    onKeyDown={(e) => {
                        if (e.key === '.') e.preventDefault();
                    }}
                    onChange={(e) => {
                        if (e.target.value.length === 0) e.target.value = integerMin.toString();
                        e.target.value = Math.floor(Number.parseInt(e.target.value)).toString();
                        onChangeHandler(e);
                    }}
                    style={{ outline: outlined ? "2px solid black" : "" }}
                ></input>
            </label>
        </div>
    )
};

IntegerInput.propTypes = {
    label: PropTypes.string,
    integer: PropTypes.integer,
    integerMin: PropTypes.integer,
    integerMax: PropTypes.integer,
    onChangeHandler: PropTypes.func,
    width: PropTypes.string,
    outlined: PropTypes.bool,
}

IntegerInput.defaultProps = {
    label: "Number: ",
    integer: 0,
    integerMin: 0,
    integerMax: 0,
    onChangeHandler: () => {},
    width: "auto",
    outlined: true,
}

export default IntegerInput;