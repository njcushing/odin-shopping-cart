import { vi } from "vitest";
import ShopItemProperties from "./../ShopItemProperties/ShopItemProperties";
import FakeStoreAPIFetch from "./FakeStoreAPIFetch.js";

vi.mock("./FakeStoreAPIFetch");

const url = "https://fakestoreapi.com/products/";

const initItem = (item, index) => {
    const id = item.id;
    const originalPrice = item.price * 100;
    const currentPrice = calculatePrice(item.price * 100, discounts[index]);
    return {
        ...ShopItemProperties(),
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
};

let discounts = [
    /* Fake Store API has 20 items */ 0.14, 0.24, 0.1, 0.05, 0.07, 0.3, 0.0,
    0.16, 0.11, 0.2, 0.12, 0.11, 0.03, 0.0, 0.17, 0.24, 0.06, 0.09, 0.15, 0.22,
];

let calculatePrice = (original, discount) => {
    return Math.ceil(original * (1.0 - discount));
};

const responseMock = () => {
    return {};
};

const fetchMock = (url) => {
    const items = {};
    let errorInst = null;
    try {
        new URL(url);
        const json = responseMock();
        const itemKeys = Object.keys(json);
        for (let i = 0; i < itemKeys.length; i++) {
            const item = json[itemKeys[i]];
            items[item.id] = initItem(item, i);
        }
    } catch (error) {
        errorInst = new Error(error);
    }
    if (errorInst) return errorInst;
    return items;
};

describe("Invoking the FakeStoreAPIFetch function...", () => {
    describe("When the url used in the fetch is valid...", () => {
        test("Should return an object", () => {
            const url = "https://fakestoreapi.com/products/";
            FakeStoreAPIFetch.mockImplementation(() => fetchMock(url));

            const response = FakeStoreAPIFetch();
            expect(typeof response === "object").toBeTruthy();
        });
    });
    describe("When the url used in the fetch is invalid...", () => {
        test("Should return an instance of Error", () => {
            const url = "%";
            FakeStoreAPIFetch.mockImplementation(() => fetchMock(url));

            const response = FakeStoreAPIFetch();
            expect(response instanceof Error).toBeTruthy();
        });
    });
});
