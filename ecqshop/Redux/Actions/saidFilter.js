export const Sorting = (sortby) =>({
    type: 'SORT_BY_FILTER',
    sortby
});
export const Getcategory = (category) => ({
    type: "GET__PRODUCT_CATEGORY",
    category
});
export const Getbrand = (brand) => ({
    type: "GET__PRODUCT_BRAND",
    brand
});
export const Getprice = (value) => ({
    type: "GET_MIN_MAX_PRICE",
    value
});

export const Getcolor = (color) => ({
    type: "GET_PRODUCT_COLOR",
    color
});


export const Getsize = (size) => ({
    type: "GET_PRODUCT_SIZE",
    size
});