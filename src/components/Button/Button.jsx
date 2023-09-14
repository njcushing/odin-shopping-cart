import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import { Link } from "react-router-dom";

const Button = ({
    text,
    colour,
    width,
    rounded,
    scale,
    onClickHandler,
    enabled,
    selected,
    link,
}) => {
    return (
        <Link
            to={link}
            className={styles[colour]}
            style={{
                width: width,
                borderRadius: rounded ? "9999px" : "0px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: `${scale}rem`,
                boxShadow: `0rem ${scale * 0.2}rem ${scale * 0.16}rem -0rem rgba(0, 0, 0, 0.16)`,
                padding: `${scale * 0.3}rem ${scale * 0.15}rem`,
            }}
            onClick={onClickHandler}
            disabled={!enabled}
            sel={`${selected ? "true" : "false"}`}
        >{text}
        </Link>
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
    scale: PropTypes.number,
    onClickHandler: PropTypes.func,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
    link: PropTypes.string,
}

Button.defaultProps = {
    text: "Button",
    colour: "limegreen",
    width: "auto",
    rounded: true,
    scale: 1.0,
    onClickHandler: () => {},
    enabled: true,
    selected: false,
    link: "",
}

export default Button;