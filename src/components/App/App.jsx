import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';

import * as ShopItemCard from '../ShopItemCard/ShopItemCard';
import * as NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import * as ShopCart from '../ShopCart/ShopCart';

const cartInit = {};
let controller;

let discounts = [ /* Fake Store API has 20 items */
    0.14, 0.24, 0.10, 0.05, 0.07, 0.30, 0.00, 0.16, 0.11, 0.20,
    0.12, 0.11, 0.03, 0.00, 0.17, 0.24, 0.06, 0.09, 0.15, 0.22,
];
let calculatePrice = (original, discount) => {
    return Math.ceil(original * (1.0 - discount));
}

const Url = 'https://fakestoreapi.com/products/';

function App() {
    const [cart, setCart] = useState(JSON.parse(JSON.stringify(cartInit)));
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
                    const id = item.id;
                    const originalPrice = (item.price * 100);
                    const currentPrice = calculatePrice((item.price * 100), discounts[itemsNew.length]);
                    itemsNew.push({ ...ShopItemCard.itemProperties(),
                        id: id,
                        name: item.description,
                        imageUrl: item.image,
                        originalPrice: originalPrice,
                        currentPrice: currentPrice,
                        quantityMin: 0,
                        quantityMax: item.rating.count,
                        addToCartHandler: () => {
                            const cartCopy = JSON.parse(JSON.stringify(cart));
                            if (!cartCopy[id]) cartCopy[id] = { ...ShopCart.item(), name: item.description }
                            cartCopy[id].quantity = 1;
                            setCart(cartCopy);
                        }
                    })
                }
            });
            setItems(itemsNew);
            setCategories(categoriesNew);
        })
        .catch((error) => {
            throw new Error(error);
        });
    }, [category, cart]);

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
                    <ShopItemCard.Component item={item} key={item.id} />
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
