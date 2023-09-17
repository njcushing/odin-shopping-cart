const ShopItemProperties = (
    name = "",
    imageUrl = "",
    originalPrice = 0,
    currentPrice = 0,
    quantityMin = 0,
    quantityMax = 0,
    currentQuantity = 0,
    quantityChangeHandler = null,
    addToCartHandler = null,
    removeFromCartHandler = null
) => {
    if (typeof name !== "string") name = "Item Information Not Found";
    if (typeof imageUrl !== "string") imageUrl = "";
    if (!Number.isInteger(originalPrice)) originalPrice = 0;
    if (!Number.isInteger(currentPrice)) currentPrice = 0;
    if (!Number.isInteger(quantityMin)) quantityMin = 0;
    if (!Number.isInteger(quantityMax)) quantityMax = 0;
    if (!Number.isInteger(currentQuantity)) currentQuantity = 0;
    if (typeof quantityChangeHandler !== "function")
        quantityChangeHandler = null;
    if (typeof addToCartHandler !== "function") addToCartHandler = null;
    if (typeof removeFromCartHandler !== "function")
        removeFromCartHandler = null;

    return {
        name,
        imageUrl,
        originalPrice,
        currentPrice,
        quantityMin,
        quantityMax,
        currentQuantity,
        quantityChangeHandler,
        addToCartHandler,
        removeFromCartHandler,
    };
};

export default ShopItemProperties;
