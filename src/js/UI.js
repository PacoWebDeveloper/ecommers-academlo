function addProductCard ({prodName, prodPrice, prodStock, prodImg}) {
    let card = `
    <div class="product-card">
        <div class="prod-img">
            <img src="${prodImg}" alt="${prodImg.slice(4,-4)}">
        </div>
        <div class="prod-data">
            <div class="price">$${prodPrice}</div>
            <div class="stock">Stock: ${prodStock}</div>
            <div class="name">${prodName}</div>
            <button class="add-to-cart">
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>
        </div>
    </div>
    `
    return card;
}

function filterProducts (filterName, products) {
    
    const filters = {
        "Show All": products,
        "Hoodies": getFilteredProducts(filterName, products),
        "Shirts": getFilteredProducts(filterName, products),
        "Sweatshirts": getFilteredProducts(filterName, products)
    }
    return filters[filterName];
}

function getFilteredProducts(filterName, products) {
    let newProducts = [];
    return newProducts = products.filter(products => products.prodName === filterName)
}

export { addProductCard, filterProducts };