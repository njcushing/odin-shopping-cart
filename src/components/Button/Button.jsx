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
    onClickHandler: PropTypes.func,
    width: PropTypes.string,
    enabled: PropTypes.bool,
}

Button.defaultProps = {
    text: "Button",
    colour: "limegreen",
    onClickHandler: () => {},
    width: "auto",
    enabled: true,
}

export default Button;