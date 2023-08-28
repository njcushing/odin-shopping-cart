import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ShopItemCard from './ShopItemCard.jsx'

const mockItemInformation = { /* Do not change existing fields, only add new ones */
    name: "Shop Item",
    originalPrice: 1500,
    currentPrice: 1500,
    quantityMin: 0,
    quantityMax: 100,
}

describe("UI/DOM Testing...", () => {
    describe("The 'Add to Cart' Button...", () => {
        test("Should be rendered to the DOM", () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            const ele = screen.getByRole("button", { name: /Add to Cart/i });
            expect(ele).toBeInTheDocument();
        });
    });
});


