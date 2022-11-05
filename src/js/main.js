import { addProductCard } from "./UI.js";
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
            prodName: 'New Dewatshirt',
            prodPrice: 14,
            prodStock: 9,
            prodImg: 'img/home.png'
        },
        {
            id: 2,
            prodName: 'Hoddies',
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
    const productList = document.querySelector('.product-list');
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
    // ============ Product list ==============
    function insertProducts(products) {
        products.forEach(product => {
            if (product.prodImg != 'img/home.png')
                productList.innerHTML += addProductCard(product)
        })
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

    closeShoppingBtn.addEventListener('click', () => {
        showHideShoppingCart();
    })

    addCartBtns.forEach(button => {
        button.addEventListener('click', () => {
            
        })
    })
})