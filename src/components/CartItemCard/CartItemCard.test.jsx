import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CartItemCard from './CartItemCard.jsx'

import ShopItemProperties from './../../modules/ShopItemProperties/ShopItemProperties';

const mockItem = {
    ...ShopItemProperties(),
    name: "Item",
    imageUrl: "test",
    originalPrice: 200,
    currentPrice: 100,
    quantityMin: 0,
    quantityMax: 100,
    currentQuantity: 10,
}

vi.mock('./../Image/Image.jsx', () => ({ 
    default: ({ url, alt }) => {
        return (<img src={url} alt={alt}></img>);
    }, 
}));

vi.mock('./../Price/Price.jsx', () => ({ 
    default: ({ original, current }) => {
        return (
            <>
                <div aria-label="price">{original}</div>
            </>
        );
    }, 
}));

vi.mock('./../IntegerInput/IntegerInput.jsx', () => ({ 
    default: ({ integer }) => {
        return <input type="number" value={integer}></input>
    }, 
}));

vi.mock('./../Button/Button.jsx', () => ({ 
    default: () => {
        return (<button></button>);
    }, 
}));

describe("UI/DOM testing...", () => {
    describe("The Image component...", () => {
        test(`Should have an 'alt' attribute equal to the 'name' prop of the
         item provided`, () => {
            render(<CartItemCard item={mockItem}/>);

            expect(screen.getByRole("img", { name: "Item", })).toBeInTheDocument();
        });
        test(`Should have a 'src' attribute equal to the 'imageUrl' prop of the
         item provided`, () => {
            render(<CartItemCard item={mockItem}/>);

            const ele = screen.getByRole("img", { name: "Item", });
            expect(ele.getAttribute('src')).toBe("test");
        });
    });
    describe("The <h4> element for the item's name...", () => {
        test(`Should have textContent equal to the 'name' prop of the item
         provided`, () => {
            render(<CartItemCard item={mockItem}/>);

            expect(screen.getByRole("heading", { name: "Item", })).toBeInTheDocument();
        });
    });
    describe("The Price component to represent the total cost of the item...", () => {
        test(`Should be passed the amount corresponding to the total value of
         the item multiplied by the quantity of that item as both the 'original'
         and 'current' props`, () => {
            render(<CartItemCard item={mockItem}/>);

            const total = (mockItem.currentPrice * mockItem.currentQuantity).toString();

            expect(screen.getByText(total, { name: "price", })).toBeInTheDocument();
        });
    });
    describe("The Price component to represent the cost of the singular item...", () => {
        test(`Should be passed the amount corresponding to the current value of the
         item as both the 'original' and 'current' props`, () => {
            render(<CartItemCard item={mockItem}/>);

            expect(screen.getByText(mockItem.currentPrice, { name: "price", })).toBeInTheDocument();
        });
    });
    describe("The IntegerInput component...", () => {
        test(`Should be passed the integer value equal to the 'currentQuantity'
         prop of the item provided`, () => {
            render(<CartItemCard item={mockItem}/>);

            const ele = screen.getByRole("spinbutton");
            expect(ele.value).toBe(mockItem.currentQuantity.toString());
        });
    });
});