import { vi } from "vitest";
import ShopItemProperties from "./../ShopItemProperties/ShopItemProperties";
import FakeStoreAPIFetch from "./FakeStoreAPIFetch.js";

const FakeStoreAPIItemFormat = {
    id: 0,
    title: "",
    price: 109.95,
    description: "",
    category: "",
    image: "",
    rating: {
        rate: 0.0,
        count: 1,
    },
};

const mockItem1 = {
    ...FakeStoreAPIItemFormat,
    id: 1,
    title: "Test",
    price: 80.0,
    description: "test item",
    category: "test category",
    image: "https://a",
    rating: {
        rate: 3.6,
        count: 8,
    },
};

const mockItems = [
    { ...mockItem1 },
    { ...FakeStoreAPIItemFormat, id: 2 },
    { ...FakeStoreAPIItemFormat, id: 3 },
    { ...FakeStoreAPIItemFormat, id: 4 },
    { ...FakeStoreAPIItemFormat, id: 5 },
];

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

let discounts = [0.14, 0.24, 0.1, 0.05, 0.07];

let calculatePrice = (original, discount) => {
    return Math.ceil(original * (1.0 - discount));
};

const responseMock = () => {
    const items = {};
    for (let i = 0; i < mockItems.length; i++) {
        const item = mockItems[i];
        items[item.id] = initItem(item, i);
    }
    return items;
};

vi.mock("./FakeStoreAPIFetch");
const fetchMock = (url) => {
    let items;
    let errorInst = null;
    try {
        new URL(url);
        /* ...fetch(url) ... */
        items = responseMock();
    } catch (error) {
        errorInst = new Error(error);
    }
    if (errorInst) return errorInst;
    return items;
};

describe("Invoking the FakeStoreAPIFetch function...", () => {
    describe("When the url used in the fetch is valid...", () => {
        describe("The return value...", () => {
            test("Should be an object,", () => {
                const url = "https://a";
                FakeStoreAPIFetch.mockImplementation(() => fetchMock(url));

                const response = FakeStoreAPIFetch();
                expect(typeof response === "object").toBeTruthy();
            });
            test(`That contains one nested object for each item returned by
           the API,`, () => {
                const url = "https://a";
                FakeStoreAPIFetch.mockImplementation(() => fetchMock(url));

                const response = FakeStoreAPIFetch();
                expect(Object.keys(response).length).toBe(mockItems.length);
            });
            test(`Each nested object should be in the extracted format defined
           by the initItem function within this test suite`, () => {
                const url = "https://a";
                FakeStoreAPIFetch.mockImplementation(() => fetchMock(url));

                const response = FakeStoreAPIFetch();
                expect(response["1"]).toStrictEqual(initItem(mockItem1, 0));
            });
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
