import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IntegerInput from './IntegerInput.jsx'

describe("UI/DOM Testing...", () => {
    describe("The input element for the 'integer' prop...", () => {
        test("Should have a default value of 0", () => {
            render(<IntegerInput />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("0");
        });
        test("Should have its value floored if it is not an integer", () => {
            render(<IntegerInput integer={3.5} integerMin={0} integerMax={100} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("3");
        });
        test("Should never have a value below 0", () => {
            render(<IntegerInput integer={-10} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("0");
        });
        test("Should never have a value lower than the 'integerMin' prop's value", () => {
            render(<IntegerInput integer={3} integerMin={7} integerMax={100} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("7");
        });
        test("Should never have a value higher than the 'integerMax' prop's value", () => {
            render(<IntegerInput integer={15} integerMin={0} integerMax={10} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("10");
        });
        test("Should call the event handler callback function when the value is changed in the input", async () => {
            const user = userEvent.setup();
            const callback = vi.fn((e) => e.target.value);
            
            render(<IntegerInput integer={0} integerMin={0} integerMax={10} onChangeHandler={callback} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });

            await user.type(integerInput, "5");

            expect(callback).toHaveBeenCalled();
        });
    });
});


