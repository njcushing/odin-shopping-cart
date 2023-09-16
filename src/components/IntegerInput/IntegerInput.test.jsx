import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IntegerInput from './IntegerInput.jsx'

describe("UI/DOM Testing...", () => {
    describe("The input element for the 'integer' prop...", () => {
        test("Should have a default value of 0", () => {
            render(<IntegerInput />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele).toHaveValue(0);
        });
        test("Should have its value floored if it is not an integer", () => {
            render(<IntegerInput integer={3.5} integerMin={0} integerMax={100} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele).toHaveValue(3);
        });
        test("Should never have a value below 0", () => {
            render(<IntegerInput integer={-10} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele).toHaveValue(0);
        });
        test("Should never have a value lower than the 'integerMin' prop's value", () => {
            render(<IntegerInput integer={3} integerMin={7} integerMax={100} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele).toHaveValue(7);
        });
        test("Should never have a value higher than the 'integerMax' prop's value", () => {
            render(<IntegerInput integer={15} integerMin={0} integerMax={10} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele).toHaveValue(10);
        });
        test(`Should call the event handler callback function when the value is
         changed in the input`, async () => {
            const user = userEvent.setup();
            const callback = vi.fn((value) => value);
            
            render(<IntegerInput onChangeHandler={callback} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });

            await user.type(ele, "5");

            expect(callback).toHaveBeenCalled();
        });
        test(`Attempting to type a decimal point (.) should result in no change
         in the input's value`, async () => {
            const user = userEvent.setup();
            
            render(<IntegerInput integer={0} integerMin={0} integerMax={100} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });

            await user.type(ele, "5");
            expect(ele).toHaveValue(5);

            await user.type(ele, ".");
            expect(ele).toHaveValue(5);
        });
    });
});


