import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
    text,
    colour,
    width,
    rounded,
    onClickHandler,
    enabled,
    selected,
}) => {
    return (
        <button
            className={styles[colour]}
            style={{ width: width, borderRadius: rounded ? "9999px" : "0px" }}
            onClick={onClickHandler}
            disabled={!enabled}
            sel={`${selected ? "true" : "false"}`}
        >{text}
        </button>
    )
};

Button.propTypes = {
    text: PropTypes.string,
    colour: PropTypes.oneOf([
        "pink",
        "red",
        "orange",
        "gold",
        "yellow",
        "limegreen",
        "green",
        "darkgreen",
        "lightblue",
        "blue",
        "darkblue",
        "indigo",
        "purple",
        "lightbrown",
        "brown",
        "lightgrey",
        "grey",
        "darkgrey",
        "black",
    ]),
    width: PropTypes.string,
    rounded: PropTypes.bool,
    onClickHandler: PropTypes.func,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
}

Button.defaultProps = {
    text: "Button",
    colour: "limegreen",
    width: "auto",
    rounded: true,
    onClickHandler: () => {},
    enabled: true,
    selected: false,
}

export default Button;