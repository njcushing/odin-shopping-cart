import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

const SubmitButton = ({
    width,
}) => {
    return (
        <button
            className={styles["SubmitButton"]}
            style={{ width: width }}
        >Submit
        </button>
    )
};

SubmitButton.propTypes = {
    width: PropTypes.string,
}

SubmitButton.defaultProps = {
    width: "auto",
}

export default SubmitButton;