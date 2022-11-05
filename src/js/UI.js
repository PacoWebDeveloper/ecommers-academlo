function addProductCard ({id, prodName, prodPrice, prodStock, prodImg}) {
    let card = `
    <div class="product-card">
        <div class="prod-img">
            <img src="${prodImg}" alt="${prodImg.slice(4,-4)}">
        </div>
        <div class="prod-data">
            <div class="price">$${prodPrice}</div>
            <div class="stock">Stock: ${prodStock}</div>
            <div class="name">${prodName}</div>
            <button class="add-to-cart" id="${id}">
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

function addToShoppingCart(product) {
    const {id, prodName, prodPrice, prodStock, prodImg, prodQuantity} = product;
    let card = `
    <div class="shop-product-card">
        <img src="${prodImg}" alt="${prodImg.slice(4,-4)}">
        <div class="shop-prod-data">
            <p class="shop-prod-name">${prodName}</p>
            <div class="shop-prod-stock-container">
                <p class="shop-prod-stock">Stock: ${prodStock}</p>
                <p class="shop-prod-price">$${prodPrice}</p>
            </div>
            <p class="shop-prod-subtotal">Subtotal: $${prodPrice * quantity}</p>
            <div class="shop-options-container" id = "${id}">
                <div class="shop-options">
                    <button class="lessBtn">-</button>
                    <span class="units">${quantity} units</span>
                    <button class="addBtn">+</button>
                </div>
                <button class="deleteBtn">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        </div>
    </div>
    `; console.log(card);
    return card;
}

export { addProductCard, filterProducts, addToShoppingCart };