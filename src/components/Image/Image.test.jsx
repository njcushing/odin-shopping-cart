import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Image from './Image.jsx'

describe("UI/DOM Testing...", () => {
    describe("The <img> element...", () => {
        test(`Should have an 'alt' attribute with value equal to the
           'alt' prop's value`, () => {
            render(<Image url="" alt="test" />);
            expect(screen.getByRole("img", { name: "test" })).toBeInTheDocument();
        });
    });
});