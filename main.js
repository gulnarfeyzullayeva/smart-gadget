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
        inStock: true
    },
    {
        id: 7,
        category: "Qulaqlıq",
        name: "AAirPods Max 2",
        price: 1100,
        inStock: false
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

    // DOM Elementləri
    const cartButtonHeader = document.querySelector('header .button button');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartBadgeCount = document.getElementById('cartBadgeCount');
    const cardElements = document.querySelectorAll('.products-cards .card');

    // Panel Açma / Bağlama
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

    // 2. HTML-dəki Kartların Stok Vəziyyətini Massivlə Sinxronlaşdırmaq
    cardElements.forEach((card, index) => {
        const product = products[index];
        const addBtn = card.querySelector('.add-cart');

        if (product && !product.inStock) {
            card.classList.add('out-of-stock');
            
            const imageBox = card.querySelector('.card-image');
            if (imageBox && !imageBox.querySelector('.stock-overlay')) {
                imageBox.insertAdjacentHTML('beforeend', '<div class="stock-overlay">TÜKƏNİB</div>');
            }

            if (addBtn) {
                addBtn.disabled = true;
                addBtn.style.backgroundColor = '#cbd5e1';
            }
        }

        // Klik Hadisəsi 
        if (addBtn && product && product.inStock) {
            addBtn.addEventListener('click', () => {
                addToCart(product, card);
            });
        }
    });

    // 3. Səbətə Əlavə Etmə
    function addToCart(product, card) {
        const imageSrc = card.querySelector('.card-image img').src;
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, imageSrc, quantity: 1 });
        }

        renderCart();
        openCart();
    }

    // 4. Səbəti Yeniləmək (Render)
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p style="text-align:center; color:#94a3b8; margin-top:20px;">Səbətiniz boşdur</p>`;
        } else {
            cart.forEach((item) => {
                total += item.price * item.quantity;
                totalCount += item.quantity;

                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price} AZN ${item.quantity > 1 ? `x ${item.quantity}` : ''}</p>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        // Qiymətləri və sayğacları yeniləmək
        cartTotalPrice.innerText = `${total} AZN`;
        cartBadgeCount.innerText = totalCount;
        cartButtonHeader.innerText = `Səbət (${totalCount})`;

        // Silmə Düymələrinə Klik Hadisəsi
        document.querySelectorAll('.remove-item-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const idToRem = parseInt(e.target.dataset.id);
                cart = cart.filter((item) => item.id !== idToRem);
                renderCart();
            });
        });
    }
});