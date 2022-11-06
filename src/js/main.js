import { addProductCard, filterProducts, addToShoppingCart, updateTotalItemsAndTotalCost, setHeaderInShoppingCart, setShoppingCartToDefault } from "./UI.js";
window.addEventListener('load', () => {
    // ===========> VARIABLES <=====================
    // ================= Menu ==============
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close');

    const menuItem = document.querySelectorAll('.menu-item');

    // ======== Shopping cart ========
    const cartBtn = document.querySelector('.cart');
    const shoppingCart = document.querySelector('.shopping-cart');
    const addCartBtns = document.querySelectorAll('.add-to-cart');
    const closeShoppingBtn = document.querySelector('.close-btn');
    const productsArray = [
        {
            id: 1,
            prodName: 'New Sweatshirt',
            prodPrice: 14,
            prodStock: 9,
            prodImg: 'img/home.png'
        },
        {
            id: 2,
            prodName: 'Hoodies',
            prodPrice: 14,
            prodStock: 9,
            prodImg: 'img/featured1.png'
        },
        {
            id: 3,
            prodName: 'Shirts',
            prodPrice: 24,
            prodStock: 13,
            prodImg: 'img/featured2.png'
        },
        {
            id: 4,
            prodName: 'Sweatshirts',
            prodPrice: 24,
            prodStock: 20,
            prodImg: 'img/featured3.png'
        }        
    ]
    let productObj = {};
    let productItem = {};
    // ================ Main product container =========
    const btnBig = document.querySelector('.btnBig');
    // ================ Product list ===================
    const productList = document.querySelector('.product-list');
    // ================ Filters ========================
    const filters = document.querySelectorAll('.filter-item');
    // =============> FUNCTIONS <========================
    //=========== Menu ==================
    function openCloseMenu() {
        menu.classList.toggle('show-menu')
        menuBtn.classList.toggle('hide');
        closeBtn.classList.toggle('hide');
    }
    // ============ shopping cart =============
    function showHideShoppingCart() {
        shoppingCart.classList.toggle('show-shoppong-cart');
    }
    function enterProdIntoProdObj (id, product) {
        if (id in productObj) {
            if (productObj[id].prodQuantity < productObj[id].prodStock)
                productObj[id].prodQuantity++;
        } else {
            productObj[id] = product;
            productObj[id].prodQuantity = 1;
        }
    }
    function removeProductFromProdObj(id, products) { 
        shoppingCart.innerHTML = setHeaderInShoppingCart();
        if (id in products) { 
            if (products[id].prodQuantity > 0)
                products[id].prodQuantity--;
            if (products[id].prodQuantity === 0) 
                delete products[id];
        } 
        for (const product in products) {
            shoppingCart.innerHTML += addToShoppingCart(products[product]);
        }
        updateTotals();
    }
    function updateTotals() {
        let quantity = 0, total = 0;
        let id = 1;
        for (id in productObj) {
            if (id in productObj) {
                quantity += productObj[id].prodQuantity;
                total += productObj[id].prodPrice * productObj[id].prodQuantity;
            }
            id++;
        }
        total = Number.parseFloat(total).toFixed(2);
        if (quantity === 0) {
            shoppingCart.innerHTML = setHeaderInShoppingCart();
            shoppingCart.innerHTML += setShoppingCartToDefault();
        }
        shoppingCart.innerHTML += updateTotalItemsAndTotalCost(quantity, total)
    }
    // ============ Product list ==============
    function insertProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            if (product.prodImg != 'img/home.png')
                productList.innerHTML += addProductCard(product)
        })
    }
    function addProductToCart (products) {
        shoppingCart.innerHTML = setHeaderInShoppingCart();
        for (const product in products) {
            shoppingCart.innerHTML += addToShoppingCart(products[product]);
        }
        updateTotals();
        enableCheckout();
    }
    function enableCheckout () {
        shoppingCart.children[3].classList.remove('checkout-btn-disabled');
        shoppingCart.children[3].classList.add('checkout-change-color');
    }
    function disableCheckout () {
        shoppingCart.children[3].classList.add('checkout-btn-disabled');
        shoppingCart.children[3].classList.remove('checkout-change-color');
    }
    // =============> ACTIONS <==================
    // ====== OnInit ========
    insertProducts(productsArray);
    
    // ===== Menu =========
    menuBtn.addEventListener('click', () => {
        openCloseMenu()
    })

    closeBtn.addEventListener('click', () => {
        openCloseMenu()
    })

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            openCloseMenu()
        })
    })
    // ================ Shopping cart =============
    cartBtn.addEventListener('click', () => {
        showHideShoppingCart();
    })

    /* closeShoppingBtn.addEventListener('click', () => {
        showHideShoppingCart();
    }) */
    shoppingCart.addEventListener('click', (e) => {
        const element = e.target;
        if (element.parentNode.classList.contains('close-btn'))
            showHideShoppingCart();
        if (element.classList.contains('lessBtn'))
            removeProductFromProdObj(element.parentNode.parentNode.id, productObj)
        if (element.classList.contains('addBtn')) {
            let id = element.parentNode.parentNode.id;
            let product = productObj[id];
            enterProdIntoProdObj(id, product)
            addProductToCart(productObj)
        }
    })
    // ================ Main product container =========
    btnBig.addEventListener('click', () => {
        enterProdIntoProdObj(1, productsArray[0]);
        addProductToCart(productObj);
    })
    // ================ Filters ========================
    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            let element = e.target;
            let filtername = ''; 
            if (element.classList.contains('filter-item'))
                filtername = element.childNodes[1].textContent
            if (element.classList.contains('filter-name'))
                filtername = element.textContent;
            if (element.classList.contains('filter-description'))
                filtername = element.previousElementSibling.textContent
            insertProducts(filterProducts(filtername,productsArray))
        })
    })
    // ================= Product list ==================
    
    productList.addEventListener('click', (e) => {
        const element = e.target;
        let id = Number(element.id);
        if (element.classList.contains('add-to-cart')) {
            productItem = productsArray.find(product => product.id === id);
        } else if (element.textContent.trim() === 'add') {
            productItem = productsArray.find(product => product.id === Number(element.parentNode.id));
            id = Number(element.parentNode.id);
        }

        enterProdIntoProdObj(id, productItem);
        addProductToCart(productObj);
    })
})