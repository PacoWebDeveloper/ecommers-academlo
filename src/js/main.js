window.addEventListener('load', () => {
    // ================= Menu ==============
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const closeBtn = document.querySelector('.close');

    const menuItem = document.querySelectorAll('.menu-item');

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

    function openCloseMenu() {
        menu.classList.toggle('show-menu')
        menuBtn.classList.toggle('hide');
        closeBtn.classList.toggle('hide');
    }

    // ================ Shopping cart =============
    const productsArray = [
        {
            prodName: 'New Dewatshirt',
            prodPrice: 14,
            prodStock: 9
        },
        {
            prodName: 'Hoddies',
            prodPrice: 14,
            prodStock: 9
        },
        {
            prodName: 'Shirts',
            prodPrice: 24,
            prodStock: 13
        },
        {
            prodName: 'Sweatshirts',
            prodPrice: 24,
            prodStock: 20
        }        
    ]
    const cartBtn = document.querySelector('.cart');
    const shoppingCart = document.querySelector('.shopping-cart');
    const addCartBtns = document.querySelectorAll('.add-to-cart');
    const closeShoppingBtn = document.querySelector('.close-btn');

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

    function showHideShoppingCart() {
        shoppingCart.classList.toggle('show-shoppong-cart');
    }

})