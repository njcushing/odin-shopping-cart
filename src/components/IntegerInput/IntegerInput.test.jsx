import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IntegerInput from './IntegerInput.jsx'

describe("Prop testing...", () => {
    describe("The 'number' prop...", () => {
        test("Should have an input element rendered for it", () => {
            render(<IntegerInput label={"Number:"} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput).toBeInTheDocument();
        });
        test("Should have a default value of 0", () => {
            render(<IntegerInput />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("0");
        });
        test("Should have its value floored if it is not an integer", () => {
            render(<IntegerInput number={3.5} numberMin={0} numberMax={100} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("3");
        });
        test("Should never have a value below 0", () => {
            render(<IntegerInput number={-10} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("0");
        });
        test("Should never have a value lower than the 'numberMin' prop's value", () => {
            render(<IntegerInput number={3} numberMin={7} numberMax={100} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("7");
        });
        test("Should never have a value higher than the 'numberMax' prop's value", () => {
            render(<IntegerInput number={15} numberMin={0} numberMax={10} />);
            const integerInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(integerInput.value).toBe("10");
        });
    });
});


