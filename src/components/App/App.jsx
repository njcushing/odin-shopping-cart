import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';

import * as ShopItemCard from '../ShopItemCard/ShopItemCard';
import * as NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import * as ShopCart from '../ShopCart/ShopCart';

const cartInit = {};

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
    const [items, setItems] = useState({});
    const [displayedItems, setDisplayedItems] = useState(new Set());
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch(Url, { mode: 'cors' })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error(`Warning: ${Url} is an invalid url for the Fake Store API`);
            }
            return response.json();
        })
        .then((response) => {
            setItems(() => {
                const itemsNew = {};
                Object.keys(response).forEach((key) => {
                    const item = response[key];
                    const id = item.id;
                    const originalPrice = (item.price * 100);
                    const currentPrice = calculatePrice((item.price * 100), discounts[Object.keys(itemsNew).length]);
                    itemsNew[id] = { ...ShopItemCard.itemProperties(),
                        id: id,
                        category: item.category,
                        name: item.description,
                        imageUrl: item.image,
                        originalPrice: originalPrice,
                        currentPrice: currentPrice,
                        quantityMin: 0,
                        quantityMax: item.rating.count,
                    };
                });
                return itemsNew;
            });
        })
        .catch((error) => {
            throw new Error(error);
        });
    }, []);

    useEffect(() => {
        const categoriesNew = new Set();
        Object.keys(items).forEach((key) => categoriesNew.add(items[key].category));
        setCategories(categoriesNew);
    }, [items]);

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
    }, [categories]);

    useEffect(() => {
        setDisplayedItems(() => {
            const displayedItemsNew = {};
            Object.keys(items).forEach((key) => {
                const item = items[key];
                if (item.category === category) {
                    const id = item.id;
                    displayedItemsNew[id] = { ...items[key],
                        currentQuantity: 1,
                    };
                }
            });
            return displayedItemsNew;
        })
    }, [category, items]);

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
                {Object.keys(displayedItems).map((item) => 
                    <ShopItemCard.Component item={displayedItems[item]} key={item} />
                )}
            </div>
        </div>
        <div className={styles["cart-sidebar"]}>
            <div className={styles["cart-sidebar-container"]}>
                <div className={styles["cart-sidebar-content"]}>
                    <Button
                        text={`Cart (${Object.keys(cart).length}) - £0.00`}
                        colour="orange"
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
