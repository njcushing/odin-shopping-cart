import { vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Link } from "react-router-dom";
import App from './App.jsx'
import FakeStoreAPIFetch from "./../../modules/FakeStoreAPIFetch/FakeStoreAPIFetch";
import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';
import ShopItemCard from './../ShopItemCard/ShopItemCard';
import * as NavBar from './../NavBar/NavBar';
import CartSidebar from './../CartSidebar/CartSidebar';
import Cart from './../Cart/Cart';
import IntegerInput from '../IntegerInput/IntegerInput';
import Image from '../Image/Image';
import Price from '../Price/Price';
import Button from '../Button/Button';

/*
    DISCLAIMER
    
    Since I couldn't find an effective way to properly reset the window object's
    location property before each test, I have had to make any tests in this
    suite that are reliant on the current value of that property rely on
    previous tests' state where Button component clicks navigate the page.

    I understand this is bad practise and not ideal, but until I find a way
    to 'reload' the window object to its initial state between tests, this is
    the best way I can test the functionality of the component.

    To more easily identify the extension to the current URL at the beginning
    of each test, I have commented it for each test.
*/

const mockItems = {
    1: {
        ...ShopItemProperties(),
        id: 1,
        category: "test category 1",
        name: "Item 1",
        imageUrl: "http://a",
        originalPrice: 1000,
        currentPrice: 600,
        quantityMin: 0,
        quantityMax: 120,
        quantityAvailable: 120,
    },
    2: {
        ...ShopItemProperties(),
        id: 2,
        category: "test category 2",
        name: "Item 2",
        imageUrl: "http://b",
        originalPrice: 1200,
        currentPrice: 300,
        quantityMin: 0,
        quantityMax: 80,
        quantityAvailable: 60,
    },
    3: {
        ...ShopItemProperties(),
        id: 3,
        category: "test category 3",
        name: "Item 3",
        imageUrl: "http://c",
        originalPrice: 320,
        currentPrice: 200,
        quantityMin: 0,
        quantityMax: 40,
        quantityAvailable: 40,
    },
};

vi.mock("./../../modules/FakeStoreAPIFetch/FakeStoreAPIFetch", () => ({ 
    default: () => mockItems, 
}));
vi.mock("./../Price/Price", () => ({
    default: ({ current }) => <div aria-label="price">{current}</div>,
}));
vi.mock("./../Button/Button", () => ({
    default: ({ text, onClickHandler, link }) => <Link to={link} onClick={onClickHandler}>{text}</Link>,
}));
vi.mock('./../ShopItemCard/ShopItemCard', () => ({ 
    default: ({ item }) => {
        const itemProps = {
            ...ShopItemProperties(),
            ...item,
        }
    
        return (<>
            <div>
            <h4>{itemProps.name}</h4>
            <Image />
            <Price
                original={itemProps.originalPrice}
                current={itemProps.currentPrice}
            />
            <IntegerInput
                label="Quantity: "
                integer={itemProps.currentQuantity}
                integerMin={itemProps.quantityMin}
                integerMax={itemProps.quantityMax}
                onChangeHandler={itemProps.quantityChangeHandler}
            />
            <Button
                text="Add to Cart"
                onClickHandler={itemProps.addToCartHandler}
            />
            </div>
        </>);
    },
}));
vi.mock("./../Image/Image", () => ({ 
    default: () => <img src="" alt=""></img>,
}));

describe("UI/DOM testing...", () => {
    describe("On the '/' route...", () => {
        describe(`The unordered-list (<ul>) element containing the shop
         categories Button components...`, () => {
            test("Should have as many children as there are categories", async () => {
                /* URL: 'http://localhost:3000/' */
                await act(async () => { render(<App />) });
                const ele = screen.getByRole("list", { name: "home-categories" });
                expect(ele.children.length).toBe(3);
            });
        });
        describe(`The category Button components...`, () => {
            test(`Should have textContent equal to the category name taken
           from the item(s) in that category`, async () => {
                /* URL: 'http://localhost:3000/' */
                await act(async () => { render(<App />) });
                expect(screen.getByRole("link", { name: "test category 1" })).toBeInTheDocument();
                expect(screen.getByRole("link", { name: "test category 2" })).toBeInTheDocument();
                expect(screen.getByRole("link", { name: "test category 3" })).toBeInTheDocument();
            });
            test("Should change the route to /shop when clicked", async () => {
                /* URL: 'http://localhost:3000/' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });
                const ele = screen.getByRole("link", { name: "test category 1" });
                await user.click(ele);

                expect(window.location.href).toBe("http://localhost:3000/shop");
            });
        });
    });
    describe("On the '/shop' route...", () => {
        describe(`The unordered-list (<ul>) element containing the ShopItemCard
         components...`, () => {
            test("Should contain only the items the correspond to that category", async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });
                await user.click(screen.getByRole("link", { name: "test category 1" }));

                const ele = screen.getByRole("list", { name: "shop-item-list" });
                expect(ele.children.length).toBe(1);
            });
        });
        describe(`The ShopItemCard components...`, () => {
            test(`Should not add an item to the cart if the 'Add to Cart'
           button is clicked when the currentQuantity is 0`, async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });
                await user.click(screen.getByRole("link", { name: "test category 1" }));

                const ele = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(ele);

                expect(screen.getByRole("heading", { name: "Your Cart is Empty" })).toBeInTheDocument();
            });
            test(`Should add an item to the cart if the 'Add to Cart'
           button is clicked when the currentQuantity is larger than 0`, async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });
                await user.click(screen.getByRole("link", { name: "test category 1" }));

                const integerInput = screen.getByRole("spinbutton", { name: /Quantity:/i });
                await user.type(integerInput, "5");
                const addToCartButton = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(addToCartButton);

                const sidebarItemList = screen.getByRole("list", { name: "shop-cart-sidebar-item-list" });

                expect(sidebarItemList).toBeInTheDocument();
                expect(sidebarItemList.children.length).toBe(1);
            });
            test(`The CardSidebarItemCard components should be removed from the
           cart when the 'Remove From Cart button is clicked`, async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });
                await user.click(screen.getByRole("link", { name: "test category 1" }));

                const integerInput = screen.getByRole("spinbutton", { name: /Quantity:/i });
                await user.type(integerInput, "5");
                const addToCartButton = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(addToCartButton);

                const removeFromCartButton = screen.getByRole("link", { name: "Remove From Cart" });
                await user.click(removeFromCartButton);

                expect(screen.getByRole("heading", { name: "Your Cart is Empty" })).toBeInTheDocument();
            });
        });
        describe(`The 'Go To Cart' Button component...`, () => {
            test(`Should change the route to /cart when clicked`, async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });

                const categoryButton = screen.getByRole("link", { name: "test category 1" });
                await user.click(categoryButton);
                const goToCartButton = screen.getByRole("link", { name: "Go To Cart" });
                await user.click(goToCartButton);

                expect(window.location.href).toBe("http://localhost:3000/cart");
            });
        });
    });
    describe(`On the '/cart' route...`, () => {
        describe(`The 'Return to Shop' Button component...`, () => {
            test("Should change the route to /shop when clicked", async () => {
                /* URL: 'http://localhost:3000/cart' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });

                const returnToShopButton = screen.getByRole("link", { name: "Return to Shop" });
                await user.click(returnToShopButton);

                expect(window.location.href).toBe("http://localhost:3000/shop");
            });
        });
        describe(`The unordered-list (<ul>) element containing the CartItemCard
         components...`, () => {
            test("Should contain the items in the cart (if there are any)", async () => {
                /* URL: 'http://localhost:3000/shop' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });

                const categoryButton = screen.getByRole("link", { name: "test category 1" });
                await user.click(categoryButton);

                const integerInput = screen.getByRole("spinbutton", { name: /Quantity:/i });
                await user.type(integerInput, "5");
                const addToCartButton = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(addToCartButton);

                const goToCartButton = screen.getByRole("link", { name: "Go To Cart" });
                await user.click(goToCartButton);

                const cartItemList = screen.getByRole("list", { name: "cart-item-list" });

                expect(cartItemList).toBeInTheDocument();
                expect(cartItemList.children.length).toBe(1);
            });
            test(`The items should be removed from the cart when the 'Remove
           From Cart button is clicked`, async () => {
                /* URL: 'http://localhost:3000/cart' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });

                const returnToShopButton = screen.getByRole("link", { name: "Return to Shop" });
                await user.click(returnToShopButton);

                const categoryButton = screen.getByRole("link", { name: "test category 1" });
                await user.click(categoryButton);

                const integerInput = screen.getByRole("spinbutton", { name: /Quantity:/i });
                await user.type(integerInput, "5");
                const addToCartButton = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(addToCartButton);
                await user.click(addToCartButton);

                const goToCartButton = screen.getByRole("link", { name: "Go To Cart" });
                await user.click(goToCartButton);

                const removeFromCartButton = screen.getByRole("link", { name: "Remove From Cart" });
                await user.click(removeFromCartButton);

                expect(screen.getByRole("heading", { name: "empty-cart" })).toBeInTheDocument();
            });
        });
        describe(`The 'Purchase Items' Button component...`, () => {
            test("Should empty any items in the cart", async () => {
                /* URL: 'http://localhost:3000/cart' */
                const user = userEvent.setup();
                await act(async () => { render(<App />) });

                const returnToShopButton = screen.getByRole("link", { name: "Return to Shop" });
                await user.click(returnToShopButton);

                const categoryButton = screen.getByRole("link", { name: "test category 1" });
                await user.click(categoryButton);

                const integerInput = screen.getByRole("spinbutton", { name: /Quantity:/i });
                await user.type(integerInput, "5");
                const addToCartButton = screen.getByRole("link", { name: "Add to Cart" });
                await user.click(addToCartButton);
                await user.click(addToCartButton);

                const goToCartButton = screen.getByRole("link", { name: "Go To Cart" });
                await user.click(goToCartButton);

                const purchaseItemsButton = screen.getByRole("link", { name: "Purchase Items" });
                await user.click(purchaseItemsButton);

                expect(screen.getByRole("heading", { name: "empty-cart" })).toBeInTheDocument();
            });
        });
    });
});