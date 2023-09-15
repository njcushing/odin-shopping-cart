import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CartSidebar from './CartSidebar.jsx'

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';

const mockItems = {
    "Item_1": { ...ShopItemProperties(), name: "Item 1", },
    "Item_2": { ...ShopItemProperties(), name: "Item 2", },
    "Item_3": { ...ShopItemProperties(), name: "Item 3", },
    "Item_4": { ...ShopItemProperties(), name: "Item 4", },
    "Item_5": { ...ShopItemProperties(), name: "Item 5", },
}

vi.mock('./../Button/Button.jsx', () => ({ 
    default: () => {
        return (<div></div>);
    }, 
}));

vi.mock('./../CartSidebarItemCard/CartSidebarItemCard.jsx', () => ({ 
    default: () => {
        return (<div></div>);
    }, 
}));

vi.mock('./../Price/Price.jsx', () => ({ 
    default: () => {
        return (<div></div>);
    }, 
}));

describe("UI/DOM testing...", () => {
    describe("The unordered-list container element containing the shop items...", () => {
        describe("If there are items in the cart...", () => {
            test("Should contain the same number of children as items in the cart", () => {
                render(<CartSidebar
                    ariaLabel={"cart-item-list"}
                    items={mockItems}
                />);

                const ele = screen.getByRole("list");
                expect(ele.children.length).toBe(5);
            });
        });
        describe("If the cart is empty...", () => {
            test("Should contain a heading that indicates the empty state of the cart", () => {
                render(<CartSidebar
                    ariaLabel={"cart-item-list"}
                    items={{}}
                />);

                expect(screen.getByRole("heading")).toBeInTheDocument();
            });
        });
    });
});