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
    /* let card = `
    <div class="shop-header">
        <p class="shop-title">My Cart</p>
        <div class="close-btn">
            <span class="material-symbols-outlined">
                close
            </span>
        </div>
    </div>
    ` */
    let card = `
    <div class="shop-product-card">
        <img src="${prodImg}" alt="${prodImg.slice(4,-4)}">
        <div class="shop-prod-data">
            <p class="shop-prod-name">${prodName}</p>
            <div class="shop-prod-stock-container">
                <p class="shop-prod-stock">Stock: ${prodStock}</p>
                <p class="shop-prod-price">$${prodPrice}</p>
            </div>
            <p class="shop-prod-subtotal">Subtotal: $${prodPrice * prodQuantity}</p>
            <div class="shop-options-container" id = "${id}">
                <div class="shop-options">
                    <button class="lessBtn">-</button>
                    <span class="units">${prodQuantity} units</span>
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
    `;
    return card;
}

function updateTotalItemsAndTotalCost(items, total) {
    let totals = `
    <div class="cart-total show-cart-total">
        <div class="total-items">
            ${items} items
        </div>
        <div class="total-cost">
            $${total}
        </div>
    </div>
    <button class="checkout-btn checkout-btn-disabled">
        <span class="material-symbols-outlined">
            verified_user
        </span>
        <span class="checkout-text">Checkout</span>
    </button>
    `;

    return totals;
}

export { addProductCard, filterProducts, addToShoppingCart, updateTotalItemsAndTotalCost };