import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './NavBar.module.css'
import { v4 as uuidv4 } from 'uuid';

const option = () => {
    return {
        id: uuidv4(),
        text: "",
        textColour: "black",
        backgroundColour: "white",
    }
}

const Component = ({
    ariaLabel,
    options,
    currentOption,
    onClickHandler,
}) => {
    return (
        <>
        <nav className={styles["NavBar"]} aria-label={ariaLabel}>
            <ul className={styles["unordered-list"]} aria-label={"nav-bar-options"}>
            {options.map((option) => 
                <li
                    className={styles["list-item"]}
                    style={{
                        color: option.textColour,
                        backgroundColor: option.backgroundColour,
                    }}
                    key={option.id}
                >{option.text}</li>
            )}
            </ul>
        </nav>
        </>
    );
};

Component.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        textColour: PropTypes.string,
        backgroundColour: PropTypes.string,
    })).isRequired,
    currentOption: PropTypes.string,
    onClickHandler: PropTypes.func,
}

Component.defaultProps = {
    onClickHandler: () => {},
}

export { Component, option };