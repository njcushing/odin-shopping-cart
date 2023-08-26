import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ShopItemCard from './ShopItemCard.jsx'

describe("Prop testing...", () => {
    describe("The 'quantity' prop...", () => {
        test("Should have an input element rendered for it", () => {
            render(<ShopItemCard />);
            const quantityInput = screen.getByRole("textbox", { name: /Quantity:/i });
            expect(quantityInput).toBeInTheDocument();
        });
        test("Should have a default value of 0", () => {
            render(<ShopItemCard />);
            const quantityInput = screen.getByRole("textbox", { name: /Quantity:/i });
            expect(quantityInput.value).toBe("0");
        });
        test("Should have its value floored if it is not an integer", () => {
            render(<ShopItemCard quantity={3.5} />);
            const quantityInput = screen.getByRole("textbox", { name: /Quantity:/i });
            expect(quantityInput.value).toBe("3");
        });
        test("Should never have a value below 0", () => {
            render(<ShopItemCard quantity={-10} />);
            const quantityInput = screen.getByRole("textbox", { name: /Quantity:/i });
            expect(quantityInput.value).toBe("0");
        });
    });
});

