import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';

import * as ShopItemCard from '../ShopItemCard/ShopItemCard';
import * as NavBar from '../NavBar/NavBar';
import Button from '../Button/Button';
import Price from '../Price/Price';
import * as CartSidebar from '../CartSidebar/CartSidebar';

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
                        quantityMax: item.rating.count - (id in cart ? cart[id].quantity : 0),
                        quantityAvailable: item.rating.count,
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
            Object.keys(items).forEach((id) => {
                const item = items[id];
                if (item.category === category) {
                    displayedItemsNew[id] = { ...items[id],
                        quantityMax: item.quantityAvailable - (id in cart ? cart[id].currentQuantity : 0),
                        quantityChangeHandler: (e) => {
                            const itemsCopy = JSON.parse(JSON.stringify(items));
                            itemsCopy[id].currentQuantity = Math.floor(Number.parseInt(e.target.value));
                            setItems(itemsCopy);
                        },
                        addToCartHandler: () => {
                            if (item.currentQuantity > 0) {
                                const cartCopy = JSON.parse(JSON.stringify(cart));
                                if (!cartCopy[id]) {
                                    cartCopy[id] = { ...CartSidebar.itemProperties(),
                                        ...item,
                                        currentQuantity: item.currentQuantity,
                                    }
                                } else {
                                    cartCopy[id].currentQuantity += item.currentQuantity;
                                }
                                setCart(cartCopy);
                            }
                        },
                    };
                }
            });
            return displayedItemsNew;
        });
    }, [category, items, cart]);

    let cartTotal = 0;
    let cartKeys = Object.keys(cart);
    for (let i = 0; i < cartKeys.length; i++) {
        let item = cart[cartKeys[i]];
        cartTotal += item.currentPrice * item.currentQuantity;
    }

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
                    <ShopItemCard.Component
                        item={displayedItems[item]}
                        key={item}
                    />
                )}
            </div>
        </div>
        <div className={styles["cart-sidebar"]}>
            <div className={styles["cart-sidebar-container"]}>
                <div className={styles["cart-sidebar-content"]}>
                    <Button
                        text="Go To Checkout"
                        colour="orange"
                        width="100%"
                        rounded={false}
                        onClickHandler={() => {}}
                    />
                    <CartSidebar.Component items={cart} />
                    <Price
                        scale={2}
                        original={cartTotal}
                        current={cartTotal}
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default App;
