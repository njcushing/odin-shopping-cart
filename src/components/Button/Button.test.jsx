import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './Button.jsx'

describe("DOM Testing...", () => {
    test("On creation, a button element should be rendered", () => {
        render(<Button />);
        const button = screen.getByRole("button", { name: /Button/i });
        expect(button).toBeInTheDocument();
    });
    test("The button's text should be the same as the provided 'text' prop's value", () => {
        render(<Button text="Example" />);
        const button = screen.getByRole("button", { name: /Example/i });
        expect(button).toBeInTheDocument();
    });
    test("On click, the button element should invoke the provided callback function", async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        
        render(<Button onClickHandler={callback} />);
        const button = screen.getByRole("button", { name: /Button/i });

        await user.click(button);

        expect(callback).toHaveBeenCalled();
    });
    test("The button element's 'disabled' attribute should not be present by default", () => {
        render(<Button />);
        const button = screen.getByRole("button", { name: /Button/i });
        expect(button.getAttribute('disabled')).toBeNull();
    });
    test("The button element's 'disabled' attribute should be true if 'enabled' prop === false", () => {
        render(<Button enabled={false} />);
        const button = screen.getByRole("button", { name: /Button/i });
        expect(button.getAttribute('disabled')).toBeFalsy();
    });
});