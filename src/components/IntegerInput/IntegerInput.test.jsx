import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IntegerInput from './IntegerInput.jsx'

describe("UI/DOM Testing...", () => {
    describe("The input element for the 'integer' prop...", () => {
        test("Should have a default value of 0", () => {
            render(<IntegerInput outlined={true} />);
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
            
            render(<IntegerInput integer={0} integerMin={0} integerMax={10} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });

            await user.type(ele, "5");
            expect(ele).toHaveValue(5);

            await user.type(ele, ".");
            expect(ele).toHaveValue(5);
        });
        test(`Attempting to delete the last digit in the input should automatically
         cause its value to be equal to the value of the 'integerMin' prop`, async () => {
            const user = userEvent.setup();
            
            render(<IntegerInput integer={8} integerMin={4} integerMax={10} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });

            expect(ele).toHaveValue(8);
            await user.type(ele, '{backspace}');
            expect(ele).toHaveValue(4);
        });
        test(`Should have the 'outlined' attribute with a value of 'true' if
         the 'outlined' prop === true`, () => {
            render(<IntegerInput outlined={true} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele.getAttribute('outlined')).toBe("true");
        });
        test(`Should have the 'outlined' attribute with a value of 'false' if
        the 'outlined' prop === false`, () => {
            render(<IntegerInput outlined={false} />);
            const ele = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(ele.getAttribute('outlined')).toBe("false");
        });
    });
});


