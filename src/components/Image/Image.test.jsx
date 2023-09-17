import { vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Image from './Image.jsx'

describe("API Testing...", () => {
    describe("The fetch to the API...", () => {
        test(`If successful, should set the 'src' attribute of the <img>
         element equal to the value of the 'src' prop provided`, () => {
            render(<Image url="https://a" alt="test" />);
            const ele = screen.getByRole("img", { name: "test" });
            expect(ele.getAttribute("src")).toBe("https://a");
        });
        test(`If unsuccessful due to an invalid URL, should set the 'src'
         attribute of the <img> element to ""`, () => {
            render(<Image url="%" alt="test" />);
            const ele = screen.getByRole("img", { name: "test" });
            expect(ele.getAttribute("src")).toBe("");
        });
    });
});

describe("UI/DOM Testing...", () => {
    describe("The <img> element...", () => {
        test(`Should have an 'alt' attribute with value equal to the
         'alt' prop's value`, () => {
            render(<Image url="https://a" alt="test" />);
            expect(screen.getByRole("img").getAttribute("alt")).toBe("test");
        });
    });
});