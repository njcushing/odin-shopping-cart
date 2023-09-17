import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import FakeStoreAPIFetch from './../../modules/FakeStoreAPIFetch/FakeStoreAPIFetch';
import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import ShopItemList from './../ShopItemList/ShopItemList';
import * as NavBar from './../NavBar/NavBar';
import CartSidebar from './../CartSidebar/CartSidebar';
import Cart from './../Cart/Cart';
import Button from './../Button/Button';

function App() {
    const [cart, setCart] = useState(JSON.parse(JSON.stringify({})));
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
        (async () => {
            const itemsNew = await FakeStoreAPIFetch();
            setItems(itemsNew instanceof Error ? {} : itemsNew);
        })();
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
            link: "/",
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
                        quantityChangeHandler: (value) => {
                            const itemsCopy = JSON.parse(JSON.stringify(items));
                            itemsCopy[id].currentQuantity = value;
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
                                    cartCopyItem.quantityChangeHandler = (value) => {
                                        const cartCopy = cartDeepCopy();
                                        cartCopy[key].currentQuantity = value;
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
                <div className={styles["home-container"]}>
                    <div className={styles["home-title"]}>
                        Welcome to my store. Click any of the categories below to start shopping!                    
                    </div>
                    <ul className={styles["home-categories-container"]} aria-label="home-categories">
                    {options.map((option) => 
                        option.text !== "Home" ?
                        <Button
                            text={option.text}
                            colour={option.colour}
                            rounded={false}
                            onClickHandler={() => setCategory(option.text)}
                            link="/shop"
                            key={option.id}
                        />
                        : null
                    )}
                    </ul>
                </div>
            ),
        },
        {
            path: "/shop",
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
                returnToShopLink="/shop"
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
