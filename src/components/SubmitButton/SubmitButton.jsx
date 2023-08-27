import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

const SubmitButton = ({
    onClickHandler,
    width,
}) => {
    return (
        <button
            className={styles["SubmitButton"]}
            style={{ width: width }}
            onClick={onClickHandler}
        >Submit
        </button>
    )
};

SubmitButton.propTypes = {
    onClickHandler: PropTypes.func,
    width: PropTypes.string,
}

SubmitButton.defaultProps = {
    onClickHandler: () => {},
    width: "auto",
}

export default SubmitButton;