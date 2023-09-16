import ShopItemProperties from './ShopItemProperties.jsx'

describe("Invoking the ShopItemProperties function...", () => {
    test("Should return an object", () => {
        expect(typeof ShopItemProperties() === "object").toBeTruthy();
    });
});

describe("Property Testing...", () => {
    describe(`Properties passed with incorrect typing should be forced to
       their default types...`, () => {
        test("The 'name' property should be a string", () => {
            expect(typeof ShopItemProperties(
                0, "", 0, 0, 0, 0, 0, () => {}, () => {}, () => {}
            ).name === "string").toBeTruthy();
        });
        test("The 'imageUrl' property should be a string", () => {
            expect(typeof ShopItemProperties(
                "", 0, 0, 0, 0, 0, 0, () => {}, () => {}, () => {}
            ).imageUrl === "string").toBeTruthy();
        });
        test("The 'originalPrice' property should be a number", () => {
            expect(typeof ShopItemProperties(
                "", "", "", 0, 0, 0, 0, () => {}, () => {}, () => {}
            ).originalPrice === "number").toBeTruthy();
        });
        test("The 'currentPrice' property should be a number", () => {
            expect(typeof ShopItemProperties(
                "", "", 0, "", 0, 0, 0, () => {}, () => {}, () => {}
            ).currentPrice === "number").toBeTruthy();
        });
        test("The 'quantityMin' property should be a number", () => {
            expect(typeof ShopItemProperties(
                "", "", 0, 0, "", 0, 0, () => {}, () => {}, () => {}
            ).quantityMin === "number").toBeTruthy();
        });
        test("The 'quantityMax' property should be a number", () => {
            expect(typeof ShopItemProperties(
                "", "", 0, 0, 0, "", 0, () => {}, () => {}, () => {}
            ).quantityMax === "number").toBeTruthy();
        });
        test("The 'currentQuantity' property should be a number", () => {
            expect(typeof ShopItemProperties(
                "", "", 0, 0, 0, 0, "", () => {}, () => {}, () => {}
            ).currentQuantity === "number").toBeTruthy();
        });
        test("The 'quantityChangeHandler' property should be null by default", () => {
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, "", () => {}, () => {}
            ).quantityChangeHandler).toBeNull();
        });
        test("The 'addToCartHandler' property should be null by default", () => {
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, () => {}, "", () => {}
            ).addToCartHandler).toBeNull();
        });
        test("The 'removeFromCartHandler' property should be null by default", () => {
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, () => {}, () => {}, ""
            ).removeFromCartHandler).toBeNull();
        });
    });
    describe("Function properties should be passed correctly...", () => {
        test("The 'quantityChangeHandler' property", () => {
            const callback = () => "result";
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, callback, () => {}, () => {}
            ).quantityChangeHandler()).toBe("result");
        });
        test("The 'addToCartHandler' property", () => {
            const callback = () => "result";
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, () => {}, callback, () => {}
            ).addToCartHandler()).toBe("result");
        });
        test("The 'removeFromCartHandler' property", () => {
            const callback = () => "result";
            expect(ShopItemProperties(
                "", "", 0, 0, 0, 0, 0, () => {}, () => {}, callback
            ).removeFromCartHandler()).toBe("result");
        });
    });
});