import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import ShopItemList from './../ShopItemList/ShopItemList';
import * as NavBar from './../NavBar/NavBar';
import CartSidebar from './../CartSidebar/CartSidebar';
import Cart from './../Cart/Cart';

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

    const displayedItemsRef = useRef();
    displayedItemsRef.current = displayedItems;

    const cartRef = useRef();
    cartRef.current = cart;

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
                    itemsNew[id] = { ...ShopItemProperties(),
                        id: id,
                        category: item.category,
                        name: item.description,
                        imageUrl: item.image,
                        originalPrice: originalPrice,
                        currentPrice: currentPrice,
                        quantityMin: 0,
                        quantityMax: item.rating.count,
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
        const cartDeepCopy = () => {
            const cartNew = {};
            const cartKeys = Object.keys(cartRef.current);
            cartKeys.forEach((key) => {
                const cartItem = cartRef.current[key];
                cartNew[cartItem.id] = { ...cartItem }
            });
            return cartNew;
        }
        setDisplayedItems(() => {
            const displayedItemsNew = {};
            Object.keys(items).forEach((id) => {
                const item = items[id];
                if (item.category === category) {
                    displayedItemsNew[id] = { ...item,
                        quantityMax: item.quantityAvailable - (id in cart ? cart[id].currentQuantity : 0),
                        quantityChangeHandler: (e) => {
                            const itemsCopy = JSON.parse(JSON.stringify(items));
                            itemsCopy[id].currentQuantity = Math.floor(Number.parseInt(e.target.value));
                            setItems(itemsCopy);
                        },
                        addToCartHandler: () => {
                            if (item.currentQuantity > 0) {
                                const cartCopy = cartDeepCopy();
                                if (!(id in cartCopy)) {
                                    cartCopy[id] = { ...ShopItemProperties(),
                                        ...item,
                                        quantityMin: 1,
                                        currentQuantity: item.currentQuantity,
                                    }
                                } else {
                                    cartCopy[id].currentQuantity += item.currentQuantity;
                                }
                                const cartCopyKeys = Object.keys(cartCopy);
                                cartCopyKeys.forEach((key) => {
                                    const cartCopyItem = cartCopy[key];
                                    cartCopyItem.quantityChangeHandler = (e) => {
                                        const cartCopy = cartDeepCopy();
                                        cartCopy[key].currentQuantity = Math.floor(Number.parseInt(e.target.value));
                                        setCart(cartCopy);
                                    }
                                    cartCopyItem.removeFromCartHandler = () => {
                                        const cartCopy = cartDeepCopy();
                                        delete cartCopy[key];
                                        setCart(cartCopy);
                                    }
                                });
                                setCart(cartCopy);
                            }
                        },
                    };
                    const maxQuantity = item.quantityAvailable - (id in cart ? cart[id].currentQuantity : 0);
                    if (items[id].currentQuantity > maxQuantity) {
                        const itemsCopy = JSON.parse(JSON.stringify(items));
                        itemsCopy[id].currentQuantity = maxQuantity;
                        setItems(itemsCopy);
                    }
                }
            });
            return displayedItemsNew;
        });
    }, [category, items, cart]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                <div className={styles["shop-main"]}>
                    <NavBar.Component
                        ariaLabel="item-categories"
                        options={options}
                        currentOption={category}
                        onClickHandler={(e) => {
                            setCategory(e.target.textContent);
                        }}
                    />
                    <ShopItemList items={displayedItems} />
                </div>
                <CartSidebar items={cart} />
                </>
            ),
        },
        {
            path: "/cart",
            element: <Cart
                returnToShopLink="/"
                items={cart}
                purchaseItemsHandler={() => setCart({})}
            />,
        },
    ]);

    return (
        <div className={styles["App"]}>
            <RouterProvider router={router} />
        </div>
    )
}

export default App;
