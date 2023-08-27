import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SubmitButton from './SubmitButton.jsx'

describe("DOM Testing...", () => {
    test("On creation, a button element should be rendered", () => {
        render(<SubmitButton />);
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
    });
    test("On click, the button element should invoke the provided callback function", async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        
        render(<SubmitButton onClickHandler={callback} />);
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await user.click(submitButton);

        expect(callback).toHaveBeenCalled();
    })
});