import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
    text,
    onClickHandler,
    width,
    enabled,
}) => {
    return (
        <button
            className={styles["Button"]}
            style={{ width: width }}
            onClick={onClickHandler}
            disabled={!enabled}
        >{text}
        </button>
    )
};

Button.propTypes = {
    text: PropTypes.string,
    onClickHandler: PropTypes.func,
    width: PropTypes.string,
    enabled: PropTypes.bool,
}

Button.defaultProps = {
    text: "Button",
    onClickHandler: () => {},
    width: "auto",
    enabled: true,
}

export default Button;