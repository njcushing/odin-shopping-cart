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
            <ul aria-label={"nav-bar-options"}>
            {options.map((option) => 
                <li key={option.id}>{option.text}</li>
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
}

export { Component, option };