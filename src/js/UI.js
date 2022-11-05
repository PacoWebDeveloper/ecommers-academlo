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

export { addProductCard };