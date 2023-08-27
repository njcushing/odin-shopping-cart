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
});