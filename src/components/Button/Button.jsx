import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
    text,
    colour,
    onClickHandler,
    width,
    enabled,
}) => {
    return (
        <button
            className={styles[colour]}
            style={{ width: width }}
            onClick={onClickHandler}
            disabled={!enabled}
        >{text}
        </button>
    )
};

Button.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.oneOf([
        "green",
    ]),
    onClickHandler: PropTypes.func,
    width: PropTypes.string,
    enabled: PropTypes.bool,
}

Button.defaultProps = {
    text: "Button",
    colour: "green",
    onClickHandler: () => {},
    width: "auto",
    enabled: true,
}

export default Button;