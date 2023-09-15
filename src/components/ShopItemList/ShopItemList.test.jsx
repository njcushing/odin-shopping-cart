import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ShopItemList from './ShopItemList.jsx'

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';

const mockItems = {
    "Item 1": { ...ShopItemProperties(), name: "Item 1", },
    "Item 2": { ...ShopItemProperties(), name: "Item 2", },
    "Item 3": { ...ShopItemProperties(), name: "Item 3", },
    "Item 4": { ...ShopItemProperties(), name: "Item 4", },
    "Item 5": { ...ShopItemProperties(), name: "Item 5", },
};

vi.mock('./../ShopItemCard/ShopItemCard.jsx', () => ({ 
    default: () => {
        return (<div></div>);
    }, 
}));

describe("UI/DOM Testing...", () => {
    describe("The unordered-list (<ul>) element containing the items...", () => {
        test("Should contain the same number of children as items provided", () => {
            render(<ShopItemList
                ariaLabel={"shop-item-list"}
                items={mockItems}
            />);

            const ele = screen.getByRole("list", { name: /shop-item-list/i });
            expect(ele.children.length).toBe(5);
        });
    });
});