import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './NavBar.module.css'
import { v4 as uuidv4 } from 'uuid';

const option = () => {
    return {
        text: "",
        textColour: "black",
        backgroundColour: "white",
    }
}

const Component = ({
    options,
    defaultOption,
}) => {
    const [currentOption, setCurrentOption] = useState("");

    return (
        <>
        <nav className={styles["NavBar"]}>
        </nav>
        </>
    );
};

Component.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        textColour: PropTypes.string,
        backgroundColour: PropTypes.string,
    })).isRequired,
    defaultOption: PropTypes.string,
}

export { Component, option };