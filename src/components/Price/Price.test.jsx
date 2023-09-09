import { vi } from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Price from './Price.jsx'

describe("The original-price element...", () => {
    test(`Should have no textContent if the values of
     itemInformation.originalPrice and itemInformation.currentPrice are
     equal`, () => {
        render(<Price original={1500} current={1500} />);
        const ele = screen.getByRole("generic", { name: /original-price/i });
        expect(ele.textContent).toBe("");
    });
    test(`Should have textContent equal to the value of
     itemInformation.originalPrice converted to GBP in the format: £AA.BB
     only if the values of itemInformation.originalPrice and
     itemInformation.currentPrice are not equal`, () => {
        render(<Price original={2000} current={1500} />);
        const ele = screen.getByRole("generic", { name: /original-price/i });
        expect(ele.textContent).toBe("£20.00");
    });
});
describe("The current-price element...", () => {
    test(`Should have textContent equal to the value of
     itemInformation.currentPrice converted to GBP in the format: £AA.BB`,
    () => {
        render(<Price original={1500} current={1500} />);
        const ele = screen.getByRole("generic", { name: /current-price/i });
        expect(ele.textContent).toBe("£15.00");
    });
});
describe("The discount-percentage element...", () => {
    test(`Should have no textContent if the values of
     itemInformation.originalPrice and itemInformation.currentPrice are
     equal`, () => {
        render(<Price original={1500} current={1500} />);
        const ele = screen.getByRole("generic", { name: /discount-percentage/i });
        expect(ele.textContent).toBe("");
    });
    test(`Should have textContent equal to the correct percentage discount
     value (rounded to the nearest integer) in the format: -XX% only if the
     values of itemInformation.originalPrice and
     itemInformation.currentPrice are not equal`, () => {
        render(<Price original={2200} current={1500} />);
        const ele = screen.getByRole("generic", { name: /discount-percentage/i });
        expect(ele.textContent).toBe("-32%");
    });
    test(`Should have textContent equal to 'FREE' if the value of
     itemInformation.currentPrice is equal to 0`, () => {
        render(<Price original={1500} current={0} />);
        const ele = screen.getByRole("generic", { name: /discount-percentage/i });
        expect(ele.textContent).toBe("FREE");
     })
});