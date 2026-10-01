const grid = document.getElementById("product-grid");
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", openOrderModal);

function renderProducts() {
    const html = products.map(product => `
    <div class="product-card" data-id="${product.id}">
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price.toLocaleString("fa-IR")} تومان </p>
    <p class="supplier">${product.supplier}</p>
    <button class="add-btn">افزودن به سبد خرید </button>
    </div>
    `).join("");

    grid.innerHTML = html;
}

renderProducts();

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalSpecs = document.getElementById("modal-specs");
const modalClose = document.getElementById("modal-close");

grid.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");
    if (!card) return;

    const id = Number(card.dataset.id);
    const product = products.find(p => p.id === id);

    if (event.target.classList.contains("add-btn")) {
        addToCart(product);
        return;
    }


    openModal(product);
});

function openModal(product) {
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalName.textContent = product.name;
    modalPrice.textContent = product.price.toLocaleString("fa-IR") + " تومان";


    const specsHtml = Object.entries(product.description).map(([key, value]) => `
 <div>
 <span>${key}</span>
 <span>${value}</span>
 </div>
 `).join("");

    modalSpecs.innerHTML = specsHtml;
    modal.classList.remove("hidden");

}

function closeModal() {
    modal.classList.add("hidden");

}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartCount();
}

function renderCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = total;
}
renderCartCount();
const cartViewButton = document.getElementById("cart-btn");
const closeCartViewButton = document.getElementById("cart-close");
const cartItemShow = document.getElementById("cart-items");

cartViewButton.addEventListener('click', openCartView);
closeCartViewButton.addEventListener('click', closeCartView);
const cartView = document.getElementsByClassName("cart-view")[0];
function openCartView() {
    cartView.classList.remove("hidden");
    renderCartView();

}

function closeCartView() {
    cartView.classList.add("hidden");

}

function renderCartView() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartViewHtml = "";
    if (cart.length === 0) {
        cartViewHtml = '<h4 class="cart-empty">سبد خرید خالی است </h4>';
    }
    else {
        cartViewHtml = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return `<div class="cart-row" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-row-info">
                <h4> ${product.name}</h4>
                <p class="unit-price">${product.price.toLocaleString("fa-IR")} تومان </p>
                </div>
                <div class="cart-row-controls">
                <button class="increment-quantity">+</button>
                <span class="qty">${item.quantity}</span>
                <button class="decrement-quantity">-</button>
                </div>
                <div class="cart-row-total">
                ${(product.price * item.quantity).toLocaleString("fa-IR")}
                </div>
                <button class="delete-item">X</button>
                </div>`;
        }).join("");
    }
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);

    document.getElementById("cart-total").textContent =
        "جمع کل: " + total.toLocaleString("fa-IR") + " تومان";
    cartItemShow.innerHTML = cartViewHtml;
    
    checkoutBtn.disabled = cart.length === 0;
}


cartItemShow.addEventListener("click", (event) => {
    const row = event.target.closest(".cart-row");
    if (!row) return;

    const id = Number(row.dataset.id);

    if (event.target.classList.contains("increment-quantity")) {
        changeQuantity(id, 1);
    } else if (event.target.classList.contains("decrement-quantity")) {
        changeQuantity(id, -1);
    } else if (event.target.classList.contains("delete-item")) {
        removeFromCart(id);
    }
});


function changeQuantity(id, delta) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.id === id);
    if (!existing) return;

    existing.quantity += delta;

            if (existing.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartView();
        renderCartCount();
    }

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartView();
    renderCartCount();
}


function openOrderModal(e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);
    const orderId = Math.floor(1000 + Math.random() * 9000);

    document.getElementById("order-id").textContent = "شماره سفارش" + orderId;
    document.getElementById("order-total").textContent =
        "مبلغ کل" + total.toLocaleString("fa-IR") + "تومان";

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        id: orderId,
        total: total,
        items: [...cart],             
        date: new Date().toISOString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    renderCartCount();
    renderCartView();

    document.getElementById("order-modal").classList.remove("hidden");

}
document.getElementById("order-close").addEventListener("click", () => {
    document.getElementById("order-modal").classList.add("hidden");
    closeCartView();
});