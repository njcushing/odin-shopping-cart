import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.css';

const Image = ({
    url,
    alt,
}) => {
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, { mode: 'cors' })
            .then((response) => { if (response.status >= 400) throw new
                Error(`${url} is not a link to a valid image.`);
                return response; 
            })
            .then((response) => setImage(response.url))
            .catch((error) => { setError(error) });
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