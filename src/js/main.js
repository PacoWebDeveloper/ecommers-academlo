import { addProductCard, filterProducts, addToShoppingCart, updateTotalItemsAndTotalCost, setHeaderInShoppingCart, setShoppingCartToDefault } from "./UI.js";
window.addEventListener('load', () => {
    
    // ===========> VARIABLES <=====================
    // ================= Loading ===================
    const mainContainer = document.querySelector('.main-container');
    const loading = document.querySelector('.loading');    
    // ================= Dark mode =================
    const darkBtn = document.querySelector('.dark');
    const logoRed = document.querySelector('#logo-red');
    const logoBlue = document.querySelector('#logo-blue');
    // ================= Menu ==============
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close');

    const menuItem = document.querySelectorAll('.menu-item');

    // ======== Shopping cart ========
    const cartBtn = document.querySelector('.cart');
    const shoppingCart = document.querySelector('.shopping-cart');
    const cartCount = document.querySelector('.cart-count');
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
    // ================== Loading ===================
    function stopLoading() {
        setTimeout(() => {
            loading.style.display = 'none';
            mainContainer.classList.add('show-main-container');
        }, 2000);
    }
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

        if (getProducsObjLength(products))
            disableCheckout();
    }
    function setQuantityCero (id, products) {
        for( id in products) {
            products[id].prodQuantity = 0;
        }
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
    function updateCartCount(products) {
        if (products) {
            let ids = Object.keys(products);
            let count = 0;
            ids.forEach(id => {
                count += products[id].prodQuantity;       
            });
            return count;
        }
        return 0;
    }
    function checkout(products) {
        const ids = Object.keys(products);
        ids.forEach(id => {
            setQuantityCero(id, products);
            removeProductFromProdObj(id, products);
        })
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
        if (getProducsObjLength(products))
            disableCheckout();
        else enableCheckout();
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
    stopLoading();
    insertProducts(productsArray);
    // =========== Loading =================
    /* mainContainer.addEventListener('load', () => {
        loading.style.display = 'none';
        mainContainer.classList.add('show-main-container');
        console.log(loading.style.display)
        console.log(mainContainer.classList)
    }) */
    // =========== Dark mode ===============
    darkBtn.addEventListener('click', () => {
        const doc = document.documentElement.style;
        if (darkBtn.children[0].textContent.trim() == 'clear_night') {
            darkBtn.children[0].textContent = 'light_mode';
            logoRed.classList.toggle('show-logo');
            logoRed.classList.toggle('hide-logo');
            logoBlue.classList.toggle('show-logo');
            logoBlue.classList.toggle('hide-logo');
            doc.setProperty('--dark-gray-color', '#f7f7f8');
            doc.setProperty('--white-color', '#1f1d2a');
            doc.setProperty('--red-color', '#9adde0');
            doc.setProperty('--black-color', '#f7f7f8');
            doc.setProperty('--filter-font', '#f7f7f8');
            doc.setProperty('--prod-data-color', '#1b1a23');
            doc.setProperty('--add-to-cart', '#1f1d2a');
            doc.setProperty('--add-to-cart-shadow', 'transparent');
            doc.setProperty('--check-disabled', '#131319');
            doc.setProperty('--light-gray-color', '#131319');
            doc.setProperty('--footer-title', '#f7f7f8');
            doc.setProperty('--footer-font', '#f7f7f8');
        }
        else {
            darkBtn.children[0].textContent = 'clear_night';
            logoRed.classList.toggle('show-logo');
            logoRed.classList.toggle('hide-logo');
            logoBlue.classList.toggle('show-logo');
            logoBlue.classList.toggle('hide-logo');
            doc.setProperty('--dark-gray-color', '#2b2b2b');
            doc.setProperty('--white-color', '#f7f7f8');
            doc.setProperty('--red-color', '#e94959');
            doc.setProperty('--black-color', '#000');
            doc.setProperty('--filter-font', '#444');
            doc.setProperty('--prod-data-color', '#fff');
            doc.setProperty('--add-to-cart', '#f0f0f0');
            doc.setProperty('--add-to-cart-shadow', 'rgba(85, 85, 85, 0.445)');
            doc.setProperty('--check-disabled', '#f0f0f0');
            doc.setProperty('--light-gray-color', '#e6e6e6');
            doc.setProperty('--footer-title', '#262626');
            doc.setProperty('--footer-font', '#6b6b6b');
            doc.setProperty('--footer-font', '#6b6b6b');
        }
    })
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
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0)
            navbar.classList.remove('navbar-visible')
        else navbar.classList.add('navbar-visible')
    })

    /* closeShoppingBtn.addEventListener('click', () => {
        showHideShoppingCart();
    }) */
    shoppingCart.addEventListener('click', (e) => {
        const element = e.target;
        if (element.parentNode.classList.contains('close-btn'))
            showHideShoppingCart();
        if (element.classList.contains('lessBtn')) {
            removeProductFromProdObj(element.parentNode.parentNode.id, productObj)
            cartCount.textContent = updateCartCount(productObj);
        }
        if (element.classList.contains('addBtn')) {
            let id = element.parentNode.parentNode.id;
            let product = productObj[id];
            enterProdIntoProdObj(id, product)
            addProductToCart(productObj)
            cartCount.textContent = updateCartCount(productObj);
        }
        if (element.parentNode.classList.contains('deleteBtn')) {
            let id = element.parentNode.parentNode.id;
            delete productObj[id];
            addProductToCart(productObj);
            cartCount.textContent = updateCartCount(productObj);
        }
        if (element.classList.contains('checkout-text') || element.classList.contains('checkout-btn') || element.parentNode.classList.contains('checkout-btn')) {
            checkout(productObj);
            updateTotals();            
            cartCount.textContent = updateCartCount();
            disableCheckout();
        }
    })
    function getProducsObjLength(productsObj) {
        const productsLength = Object.keys(productsObj);
        if (productsLength.length === 0)
            return true;
        return false;
    }
    // ================ Main product container =========
    btnBig.addEventListener('click', () => {
        enterProdIntoProdObj(1, productsArray[0]);
        addProductToCart(productObj);
        cartCount.textContent = updateCartCount(productObj);
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
        cartCount.textContent = updateCartCount(productObj);
    })
})