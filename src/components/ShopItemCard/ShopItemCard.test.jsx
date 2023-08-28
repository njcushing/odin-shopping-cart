import { vi } from 'vitest'
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

vi.mock('./../IntegerInput/IntegerInput.jsx', () => ({ 
    default: ({ label, integer }) => {
        return (<>
            <label>{label}
                <input type="number" value={integer} onChange={() => {}}></input>
            </label>
        </>);
    }, 
}));

describe("UI/DOM Testing...", () => {
    describe("The item name element...", () => {
        test(`Should have textContent equal to the provided itemInformation.name
         value`, () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            expect(screen.getByRole("heading", { name: /Shop Item/i })).toBeInTheDocument();
        });
    });
    describe("The original-price element...", () => {
        test(`Should have no textContent if the values of
         itemInformation.originalPrice and itemInformation.currentPrice are
         equal`, () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            const ele = screen.getByRole("generic", { name: /original-price/i });
            expect(ele.textContent).toBe("");
        });
    });
    describe("The current-price element...", () => {
        test(`Should have textContent equal to the value of
         itemInformation.currentPrice converted to GBP in the format: £AA.BB`,
        () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            const ele = screen.getByRole("generic", { name: /current-price/i });
            expect(ele.textContent).toBe("£15.00");
        });
    });
    describe("The discount-percentage element...", () => {
        test(`Should have no textContent if the values of
         itemInformation.originalPrice and itemInformation.currentPrice are
         equal`, () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            const ele = screen.getByRole("generic", { name: /discount-percentage/i });
            expect(ele.textContent).toBe("");
        });
    });
    describe("The IntegerInput component for the 'quantity' prop...", () => {
        test("Should have a label with textContent equal to 'Quantity:'", () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            expect(screen.getByRole("spinbutton", { name: /Quantity:/i })).toBeInTheDocument();
        });
    });
    describe("The 'Add to Cart' Button...", () => {
        test("Should have textContent equal to 'Add to Cart'", () => {
            render(<ShopItemCard itemInformation={mockItemInformation} />);
            expect(screen.getByRole("button", { name: /Add to Cart/i })).toBeInTheDocument();
        });
    });
});


