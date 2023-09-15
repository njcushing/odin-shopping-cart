import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './NavBar.module.css'
import { v4 as uuidv4 } from 'uuid';

import Button from "./../Button/Button";

const option = () => {
    return {
        id: uuidv4(),
        text: "",
        colour: "gold",
        link: "",
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
                <Button
                    text={option.text}
                    colour={option.colour}
                    rounded={false}
                    onClickHandler={option.text !== currentOption ? onClickHandler : () => {}}
                    selected={option.text === currentOption}
                    link={option.link}
                    key={option.id}
                />
            )}
            </ul>
        </nav>
        </>
    );
};

Component.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        colour: PropTypes.string,
        link: PropTypes.string,
    })).isRequired,
    currentOption: PropTypes.string,
    onClickHandler: PropTypes.func,
}

Component.defaultProps = {
    onClickHandler: () => {},
}

export { Component, option };