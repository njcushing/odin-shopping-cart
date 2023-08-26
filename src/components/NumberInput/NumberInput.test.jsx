import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NumberInput from './NumberInput.jsx'

describe("Prop testing...", () => {
    describe("The 'number' prop...", () => {
        test("Should have an input element rendered for it", () => {
            render(<NumberInput label={"Number:"} />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput).toBeInTheDocument();
        });
        test("Should have a default value of 0", () => {
            render(<NumberInput />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput.value).toBe("0");
        });
        test("Should have its value floored if it is not an integer", () => {
            render(<NumberInput number={3.5} numberMin={0} numberMax={100} />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput.value).toBe("3");
        });
        test("Should never have a value below 0", () => {
            render(<NumberInput number={-10} />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput.value).toBe("0");
        });
        test("Should never have a value lower than the 'numberMin' prop's value", () => {
            render(<NumberInput number={3} numberMin={7} numberMax={100} />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput.value).toBe("7");
        });
        test("Should never have a value higher than the 'numberMax' prop's value", () => {
            render(<NumberInput number={15} numberMin={0} numberMax={10} />);
            const numberInput = screen.getByRole("spinbutton", { name: /Number:/i });
            expect(numberInput.value).toBe("10");
        });
    });
});


