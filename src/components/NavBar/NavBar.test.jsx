import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import * as NavBar from './NavBar.jsx'

console.log(NavBar);

const newOption = NavBar.option();
const mockOptions = [
    { ...newOption, text: "Option 1", },
    { ...newOption, text: "Option 2", },
    { ...newOption, text: "Option 3", },
    { ...newOption, text: "Option 4", },
    { ...newOption, text: "Option 5", },
]

describe("UI/DOM testing...", () => {
    describe("The NavBar button container...", () => {
        test("Should contain the same number of buttons as options provided", () => {
            render(<NavBar.Component options={mockOptions} defaultOption="Option 1" />);
            const ele = screen.getByRole("navigation");
            expect(ele.children.length).toBe(5);
        })
    });
});