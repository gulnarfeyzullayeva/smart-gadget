const products = [
    {
        id: 1,
        category: "Saat",
        name: "Apple Watch Ultra 4",
        price: 900,
        inStock: true
    },
    {
        id: 2,
        category: "Telefon",
        name: "iPhone 18 Pro",
        price: 1800,
        inStock: false
    },
    {
        id: 3,
        category: "Laptop",
        name: "MacBook Neo",
        price: 2800,
        inStock: true
    },
    {
        id: 4,
        category: "Qulaqlıq",
        name: "AAirPods Pro 3",
        price: 550,
        inStock: true
    },
    {
        id: 5,
        category: "Telefon",
        name: "iPhone 17e",
        price: 1200,
        inStock: true
    },
    {
        id: 6,
        category: "Planşet",
        name: "iPad Air",
        price: 1250,
        inStock: false
    },
    {
        id: 7,
        category: "Qulaqlıq",
        name: "AAirPods Max 2",
        price: 1100,
        inStock: true
    },
    {
        id: 8,
        category: "Telefon",
        name: "iPhone Duo",
        price: 2500,
        inStock: true
    },
]


document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    // DOM Elements
    const cartButtonHeader = document.querySelector('header .button button');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartBadgeCount = document.getElementById('cartBadgeCount');
    const addCartBtns = document.querySelectorAll('.add-cart');

    // Open & Close Sidebar Handlers
    const openCart = () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
    };

    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
    };

    cartButtonHeader.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Add Product to Cart
    addCartBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const title = card.querySelector('.product-name h3').innerText;
            const priceText = card.querySelector('.product-price-cart p').innerText;
            const price = parseInt(priceText.replace(' AZN', ''));
            const imageSrc = card.querySelector('.card-image img').src;

            // Add item object
            cart.push({ id: Date.now(), title, price, imageSrc });
            renderCart();
            openCart();
        });
    });

    // Render Cart Content
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p style="text-align:center; color:#94a3b8; margin-top:20px;">Səbətiniz boşdur</p>`;
        } else {
            cart.forEach((item) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>${item.price} AZN</p>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        // Update Total & Badges
        cartTotalPrice.innerText = `${total} AZN`;
        cartBadgeCount.innerText = cart.length;
        cartButtonHeader.innerText = `Səbət (${cart.length})`;

        // Remove item listeners
        document.querySelectorAll('.remove-item-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const idToRem = parseInt(e.target.dataset.id);
                cart = cart.filter((item) => item.id !== idToRem);
                renderCart();
            });
        });
    }
});
