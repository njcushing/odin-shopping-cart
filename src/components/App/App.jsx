import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';

import ShopItemCard from '../ShopItemCard/ShopItemCard';

const Url = 'https://fakestoreapi.com/products';
const addItemFromAPI = (array, item) => {
    array.push({
        id: uuidv4(),
        name: item.description,
        imageUrl: item.image,
        originalPrice: (item.price * 100),
        currentPrice: Math.ceil((item.price * 100) - Math.random() * ((item.price * 100) / 3)),
        quantityMin: 0,
        quantityMax: item.rating.count,
    })
}

function App() {
    const [category, setCategory] = useState("men's clothing");
    const [items, setItems] = useState([]);

    useEffect(() => {
        let itemsNew = [];
        (() => {
            fetch(Url, { mode: 'cors' })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error(`Warning: ${Url} is an invalid call to the Fake Store API`);
                }
                return response.json();
            })
            .then((response) => {
                response.forEach((item) => {
                    if (item.category === category) {
                        addItemFromAPI(itemsNew, item);
                    }
                });
                setItems(itemsNew);
            })
            .catch((error) => { throw new Error(error) });
        })();
    }, [category]);

    return (
        <div className={styles["item-list"]}>
            {items.map((item) => 
                <ShopItemCard itemInformation={item} key={item.id} />
            )}
        </div>
    )
}

export default App;
