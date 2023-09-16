import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import Button from './Button.jsx'

describe("UI/DOM Testing...", () => {
    describe("The button (Link) element...", () => {
        test(`Should have the same textContent as the provided 'text' prop's
         value`, () => {
            render(<BrowserRouter><Button text="Example" /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Example/i });
            expect(button).toBeInTheDocument();
        });
        test(`When clicked, should invoke the provided callback function`, async () => {
            const user = userEvent.setup();
            const callback = vi.fn();
            
            render(<BrowserRouter><Button onClickHandler={callback} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });

            await user.click(button);

            expect(callback).toHaveBeenCalled();
        });
        test(`Should not have the 'disabled' attribute by default`, () => {
            render(<BrowserRouter><Button enabled={true} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeNull();
        });
        test(`Should have the 'disabled' attribute if the 'enabled'
         prop === false`, () => {
            render(<BrowserRouter><Button enabled={false} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeFalsy();
        });
        test(`Should have no 'border-radius' styling value of '9999px' if
         the 'rounded' prop is set to is set to 'true'`, () => {
            render(<BrowserRouter><Button rounded={true} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.style["border-radius"]).toBe("9999px");
        });
        test(`Should have no 'border-radius' styling value of '0px' if
        the 'rounded' prop is set to is set to 'true'`, () => {
            render(<BrowserRouter><Button rounded={false} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.style["border-radius"]).toBe("0px");
        });
        test(`Should have the 'sel' (selected) attribute with a value
         of 'true' if the 'selected' prop === true`, () => {
            render(<BrowserRouter><Button selected={true} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('sel')).toBe("true");
        });
        test(`Should have the 'sel' (selected) attribute with a value
        of 'false' if the 'selected' prop === false`, () => {
            render(<BrowserRouter><Button selected={false} /></BrowserRouter>);
            const button = screen.getByRole("link", { name: /Button/i });
            expect(button.getAttribute('sel')).toBe("false");
        });
    });
});