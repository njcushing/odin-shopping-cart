import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './Button.jsx'

describe("UI/DOM Testing...", () => {
    describe("The button element...", () => {
        test("Should have the same textContent as the provided 'text' prop's value", () => {
            render(<Button text="Example" />);
            const button = screen.getByRole("button", { name: /Example/i });
            expect(button).toBeInTheDocument();
        });
        test("When clicked, should invoke the provided callback function", async () => {
            const user = userEvent.setup();
            const callback = vi.fn();
            
            render(<Button onClickHandler={callback} />);
            const button = screen.getByRole("button", { name: /Button/i });

            await user.click(button);

            expect(callback).toHaveBeenCalled();
        });
        test("Should not have the 'disabled' attribute by default", () => {
            render(<Button />);
            const button = screen.getByRole("button", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeNull();
        });
        test("Should have the 'disabled' attribute if the 'enabled' prop === false", () => {
            render(<Button enabled={false} />);
            const button = screen.getByRole("button", { name: /Button/i });
            expect(button.getAttribute('disabled')).toBeFalsy();
        });
    });
});