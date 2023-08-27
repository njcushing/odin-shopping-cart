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
    test("On click, the button element should invoke the provided callback function", async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        
        render(<Button onClickHandler={callback} />);
        const button = screen.getByRole("button", { name: /Button/i });

        await user.click(button);

        expect(callback).toHaveBeenCalled();
    });
});