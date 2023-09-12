import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import * as CartSidebar from './CartSidebar.jsx'

const mockItems = {
    "Item_1": { ...CartSidebar.item(), name: "Item 1", },
    "Item_2": { ...CartSidebar.item(), name: "Item 2", },
    "Item_3": { ...CartSidebar.item(), name: "Item 3", },
    "Item_4": { ...CartSidebar.item(), name: "Item 4", },
    "Item_5": { ...CartSidebar.item(), name: "Item 5", },
}

describe("UI/DOM testing...", () => {
    describe("The unordered-list container element containing the shop items...", () => {
        describe("If there are items in the cart...", () => {
            test("Should contain the same number of children as items in the cart", () => {
                render(<CartSidebar.Component
                    ariaLabel={"shop-cart"}
                    items={mockItems}
                />);

                const ele = screen.getByRole("list", { name: /cart-item-list/i });
                expect(ele.children.length).toBe(5);
            });
        });
        describe("If the cart is empty...", () => {
            test("Should contain a heading that indicates the empty state of the cart", () => {
                render(<CartSidebar.Component
                    ariaLabel={"shop-cart"}
                    items={{}}
                />);

                expect(screen.getByRole("heading", { name: /Your Cart is Empty/i })).toBeInTheDocument();
            });
        });
    });
});