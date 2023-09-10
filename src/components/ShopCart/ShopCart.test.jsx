import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import * as ShopCart from './ShopCart.jsx'

const mockItems = [
    { ...ShopCart.item(), name: "Item 1", },
    { ...ShopCart.item(), name: "Item 2", },
    { ...ShopCart.item(), name: "Item 3", },
    { ...ShopCart.item(), name: "Item 4", },
    { ...ShopCart.item(), name: "Item 5", },
]

describe("UI/DOM testing...", () => {
    describe("The unordered-list container element containing the shop items...", () => {
        test("Should contain the same number of children as items in the cart", () => {
            render(<ShopCart.Component
                ariaLabel={"shop-cart"}
                items={mockItems}
            />);

            const ele = screen.getByRole("list", { name: /cart-item-list/i });
            expect(ele.children.length).toBe(5);
        });
    });
});