// Get Category From Product json
export const CategoryList = (products) => {
    var uniqueCategorys = [];
    products.map((product) => {
        if (product.tags.length > 0 && product.tags) {
            product.tags.map((categorys) => {
                if(categorys && categorys.length > 0)
                {
                    if (uniqueCategorys.indexOf(categorys) === -1) {
                        uniqueCategorys.push(categorys);
                    }
                }
            })
        }
    })
    return uniqueCategorys;
}
export const GetBrandList = (products) =>{
    var uniqueBrands = [];
    products.map((product) =>{
        if(product.brands.length > 0 && product.brands){
            product.brands.map((brands) => {
                if(brands && brands.length > 0){
                    if(uniqueBrands.indexOf(brands) === -1){
                        uniqueBrands.push(brands);
                    }
                }
            })
        }
    })
    return uniqueBrands;
}
// Get Size From Product json
export const GetsizeList = (products) => {
    var uniqueSizes = [];
    products.map((product) => {
        if (product.size.length > 0 && product.size) {
            product.size.map((sizes) => {
                if(sizes && sizes.length > 0)
                {
                    if (uniqueSizes.indexOf(sizes) === -1) {
                        uniqueSizes.push(sizes);
                    }
                }
            })
        }
    })
    return uniqueSizes;
}

export const FilterProduct = (productPerCat, { brand, category, size, color, value, sortby }) => {
    console.log(productPerCat.products);
    console.log('sortBy =>', sortby);
    console.log('The CAtegory ', category);
    console.log('The VAlue ', value);
    let sizes = size;

    return productPerCat.products.filter(product => {

        let categoryMatchValue;
        if (product.tags)
            categoryMatchValue = product.tags.some(tag => category.includes(tag))
        else
            categoryMatchValue = true;

        let brandMatchValue;
        if (product.brands) {
            brandMatchValue = product.brands.some(bran => brand.includes(bran))
        } else {
            brandMatchValue = true;
        }
        let sizeMatchValue;
        if (product.size)
            sizeMatchValue = product.size.some(size => sizes.includes(size))
        else
            sizeMatchValue = true;

        let colorMatchValue;
        if (color && product.colors) {
            colorMatchValue = product.colors.some(colors => color.includes(colors))
        } else {
            colorMatchValue = false;
        }

        const startPriceMatchValue = typeof value.min !== 'number' || value.min <= product.product_price;
        const endPriceMatchValue = typeof value.max !== 'number' || product.product_price <= value.max;

        if (category.length > 0 && color.length > 0 && size.length > 0 && brand.length > 0) {
            return categoryMatchValue && brandMatchValue && colorMatchValue && sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && color.length > 0 && size.length > 0 && brand.length > 0) {
            return categoryMatchValue && brandMatchValue && colorMatchValue && sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && size.length > 0 && brand.length > 0) {
            return categoryMatchValue && brandMatchValue && colorMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && color.length > 0 && brand.length > 0) {
            return categoryMatchValue && brandMatchValue && colorMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (color.length > 0 && size.length > 0 && brand.length > 0) {
            return colorMatchValue && sizeMatchValue && startPriceMatchValue && brandMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && color.length > 0) {
            return categoryMatchValue && colorMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && size.length > 0) {
            return categoryMatchValue && sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0 && brand.length > 0) {
            return categoryMatchValue && brandMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0) {
            return categoryMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (color.length > 0 && size.length > 0) {
            return colorMatchValue && sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (color.length > 0) {
            return colorMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (size.length > 0) {
            return sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (color.length > 0) {
            return colorMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        if (category.length > 0) {
            return categoryMatchValue;
        }
        if (brand.length > 0) {
            return brandMatchValue;
        }
        if (size.length > 0) {
            return sizeMatchValue && startPriceMatchValue && endPriceMatchValue;
        }
        else {
            return startPriceMatchValue && endPriceMatchValue;
        }

    }).sort((product1, product2) => {
        if (sortby === 2) {
            return Number(product2.product_price) < Number(product1.product_price) ? -1 : 1;
        } else if (sortby === 3) {
            return Number(product2.product_price) > Number(product1.product_price) ? -1 : 1;
        } else if (sortby === 1) {
            return product2.product_Id < product1.product_Id ? -1 : 1;
        } else {
            return product2.product_Id > product1.product_Id ? -1 : 1;
        }
    });
}

// Get Min & Max Data in Json
export const GetMinMaxPrice = (products) => {
    let minimum = 0, maximum = 150000;
    products.map((product, index) => {
        let v = product.product_price;
        if(v < minimum)
        {
            minimum=v;
        }
        else
        {
            minimum=minimum;
        }
        if(v > maximum)
        {
            maximum=v;
        }
        else
        {
            maximum=maximum;
        }
    })
    return {'min':minimum, 'max':maximum};
}