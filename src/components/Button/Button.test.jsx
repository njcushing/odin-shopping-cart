import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import Button from './Button.jsx'

describe("UI/DOM Testing...", () => {
    describe("The button element...", () => {
        test(`Should have the same textContent as the provided 'text' prop's
         value`, () => {
            render(<BrowserRouter><Button text="Example" /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Example/i });
            expect(button).toBeInTheDocument();
        });
        test("When clicked, should invoke the provided callback function", async () => {
            const user = userEvent.setup();
            const callback = vi.fn();
            
            render(<BrowserRouter><Button onClickHandler={callback} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });

            await user.click(button);

            expect(callback).toHaveBeenCalled();
        });
        test("Should not have the 'disabled' attribute by default", () => {
            render(<BrowserRouter><Button /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeNull();
        });
        test("Should have the 'disabled' attribute if the 'enabled' prop === false", () => {
            render(<BrowserRouter><Button enabled={false} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeFalsy();
        });
    });
});