import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import * as NavBar from './NavBar.jsx'

const mockOptions = [
    { ...NavBar.option(), text: "Option 1", },
    { ...NavBar.option(), text: "Option 2", },
    { ...NavBar.option(), text: "Option 3", },
    { ...NavBar.option(), text: "Option 4", },
    { ...NavBar.option(), text: "Option 5", },
]

vi.mock('./../Button/Button.jsx', () => ({ 
    default: ({ text, onClickHandler }) => {
        return (<button onClick={onClickHandler}>{text}</button>);
    }, 
}));

describe("UI/DOM testing...", () => {
    describe("The unordered-list (<ul>) element containing the NavBar options...", () => {
        test("Should contain the same number of children as options provided", () => {
            render(<NavBar.Component
                ariaLabel={"nav-bar"}
                options={mockOptions}
                currentOption="Option 1"
            />);

            const ele = screen.getByRole("list", { name: /nav-bar-options/i });
            expect(ele.children.length).toBe(5);
        });
    });
    describe("A listitem (<li>) element that represents a NavBar option...", () => {
        test("Should have textContent equal to the 'text' property for each option", () => {
            render(<NavBar.Component
                ariaLabel={"nav-bar"}
                options={mockOptions}
                currentOption="Option 1"
            />);

            expect(screen.getByText("Option 1")).toBeInTheDocument();
            expect(screen.getByText("Option 2")).toBeInTheDocument();
            expect(screen.getByText("Option 3")).toBeInTheDocument();
            expect(screen.getByText("Option 4")).toBeInTheDocument();
            expect(screen.getByText("Option 5")).toBeInTheDocument();
        });
        describe("Should invoke the 'onClick' callback function...", () => {
            test("If the option clicked is not equal to the current one", async () => {
                const user = userEvent.setup();
                const callback = vi.fn();
                
                render(<NavBar.Component
                    ariaLabel={"nav-bar"}
                    options={mockOptions}
                    currentOption="Option 1"
                    onClickHandler={callback}
                />);
                const ele = screen.getByText("Option 2");

                await user.click(ele);

                expect(callback).toHaveBeenCalled();
            });
            test("Unless the option clicked is equal to the current one", async () => {
                const user = userEvent.setup();
                const callback = vi.fn();
                
                render(<NavBar.Component
                    ariaLabel={"nav-bar"}
                    options={mockOptions}
                    currentOption="Option 1"
                    onClickHandler={callback}
                />);
                const ele = screen.getByText("Option 1");

                await user.click(ele);

                expect(callback).not.toHaveBeenCalled();
            });
        });
    })
});