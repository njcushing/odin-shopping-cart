import ShopItemProperties from './ShopItemProperties.jsx'

describe("Invoking the ShopItemProperties function...", () => {
    test("Should return an object", () => {
        expect(typeof ShopItemProperties() === "object").toBeTruthy();
    });
});