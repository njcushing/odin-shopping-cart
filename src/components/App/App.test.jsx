import { vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App.jsx'

vi.mock('./../Button/Button.jsx', () => ({ 
    default: () => {
        return (<button></button>);
    }, 
}));

describe("UI/DOM testing...", () => {
    describe("On the '/' route...", () => {
        describe(`The unordered-list (<ul>) element containing the shop
         categories Button components...`, () => {
            test("Should have as many children as there are categories", async () => {
                await act(async () => { render(<App />) });
                const ele = screen.getByRole("list", { name: "home-categories" });
                expect(ele.children.length).toBe(0);
            });
        });
    });
});