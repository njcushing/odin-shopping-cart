import { vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App.jsx'
import FakeStoreAPIFetch from "./../../modules/FakeStoreAPIFetch/FakeStoreAPIFetch";

vi.mock('./../Button/Button.jsx', () => ({ 
    default: () => {
        return (<button></button>);
    }, 
}));

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
const mockItems = [
    { ...FakeStoreAPIItemFormat,
        id: 1,
        title: "Item 1",
        price: 1.00,
        description: "Test Item 1",
        category: "Test Category 1",
        image: "http://a",
        rating: {
            rate: 3.5,
            count: 120,
        }
    },
    { ...FakeStoreAPIItemFormat,
        id: 2,
        title: "Item 2",
        price: 2.00,
        description: "Test Item 2",
        category: "Test Category 2",
        image: "http://b",
        rating: {
            rate: 4.0,
            count: 80,
        }
    },
    { ...FakeStoreAPIItemFormat,
        id: 3,
        title: "Item 3",
        price: 3.00,
        description: "Test Item 3",
        category: "Test Category 3",
        image: "http://c",
        rating: {
            rate: 2.0,
            count: 40,
        }
    },
];

vi.mock("./../../modules/FakeStoreAPIFetch/FakeStoreAPIFetch");
FakeStoreAPIFetch.mockImplementation(() => mockItems);


describe("UI/DOM testing...", () => {
    describe("On the '/' route...", () => {
        describe(`The unordered-list (<ul>) element containing the shop
         categories Button components...`, () => {
            test("Should have as many children as there are categories", async () => {
                await act(async () => { render(<App />) });
                const ele = screen.getByRole("list", { name: "home-categories" });
                expect(ele.children.length).toBe(3);
            });
        });
    });
});