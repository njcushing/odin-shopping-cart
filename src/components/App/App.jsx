import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';

import ShopItemCard from '../ShopItemCard/ShopItemCard';
import * as NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import * as ShopCart from '../ShopCart/ShopCart';

let controller;

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

const cart = {};

function App() {
    const [categories, setCategories] = useState(new Set());
    const [category, setCategory] = useState("men's clothing");
    const [items, setItems] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let itemsNew = [];
        let categoriesNew = new Set();

        if (controller) controller.abort();
        controller = new AbortController();
        const signal = controller.signal;

        fetch(Url, { mode: 'cors', signal: signal })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error(`Warning: ${Url} is an invalid call to the Fake Store API`);
            }
            return response.json();
        })
        .then((response) => {
            response.forEach((item) => {
                categoriesNew.add(item.category);
                if (item.category === category) {
                    addItemFromAPI(itemsNew, item);
                }
            });
            setItems(itemsNew);
            setCategories(categoriesNew);
        })
        .catch((error) => {
            throw new Error(error);
        });
    }, [category]);

    useEffect(() => {
        const optionsNew = [];
        optionsNew.push({
            ...NavBar.option(),
            text: "Home",
            colour: "gold",
        });
        categories.forEach((category) => {
            optionsNew.push({
                ...NavBar.option(),
                text: category,
                colour: "yellow",
            })
        })
        setOptions(optionsNew);
    }, [categories, category]);

    return (
        <div className={styles["App"]}>
        <div className={styles["shop-main"]}>
            <NavBar.Component
                ariaLabel="item-categories"
                options={options}
                currentOption={category}
                onClickHandler={(e) => {
                    setCategory(e.target.textContent);
                }}
            />
            <div className={styles["item-list"]}>
                {items.map((item) => 
                    <ShopItemCard itemInformation={item} key={item.id} />
                )}
            </div>
        </div>
        <div className={styles["cart-sidebar"]}>
            <div className={styles["cart-sidebar-container"]}>
                <div className={styles["cart-sidebar-content"]}>
                    <Button
                        text={`Cart (${Object.keys(cart).length}) - £0.00`}
                        colour="red"
                        width="100%"
                        rounded={false}
                        onClickHandler={() => {}}
                    />
                    <ShopCart.Component items={cart} />
                </div>
            </div>
        </div>
        </div>
    )
}

export default App;
