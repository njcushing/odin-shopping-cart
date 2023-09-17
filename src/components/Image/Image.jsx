import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.css';

const Image = ({
    url,
    alt,
}) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        try {
            new URL(url);
        } catch (error) {
            setImage("");
            return;
        }
        setImage(url);
    }, [url]);

    return (
        <img className={styles["Image"]} src={image} alt={alt}></img>
    );
}

Image.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default Image;