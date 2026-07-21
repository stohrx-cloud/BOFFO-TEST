// Shared by every seasonal ordering page (christmas-menu.html, etc).
// Each page must define, in its own inline <script> BEFORE including this file:
//   window.CURRENT_SEASONAL_SLUG = 'christmas';
//   window.PICKUP_MIN = '2026-12-20';
//   window.PICKUP_MAX = '2026-12-24';
//   window.CONFIRMATION_EMOJI = '🎄';
//   window.MENU_ITEMS = { ... };

/* ---------- NAV / MENU ---------- */
let last = 0;
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const burger = document.querySelector(".burger");
const cartPanel = document.getElementById("cartPanel");
const cartToggleEl = document.querySelector(".cart-toggle");
const checkoutOverlay = document.getElementById("checkoutOverlay");

window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    if (current > last && current > 80) {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }
    last = current;
});

function toggleMenu(){
    menu.classList.toggle("open");
    cartPanel.classList.remove("open");
}
function closeMenu(){
    menu.classList.remove("open");
}

function toggleCart(){
    cartPanel.classList.toggle("open");
    menu.classList.remove("open");
}
function closeCart(){
    cartPanel.classList.remove("open");
}

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
    }
    if (!cartPanel.contains(e.target) && !cartToggleEl.contains(e.target)) {
        closeCart();
    }
});

/* ---------- CART STATE ---------- */
let cart = [];

function addItemToCartState(name, price){
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    renderCart();
    cartPanel.classList.add("open");
    menu.classList.remove("open");
}

function addToCart(itemId){
    const item = window.MENU_ITEMS[itemId];
    if (!item) return;
    addItemToCartState(item.name, item.price);
}

function addVariantToCart(button){
    const select = button.previousElementSibling;
    const itemId = select.dataset.item;
    const item = window.MENU_ITEMS[itemId];
    const variant = item.sizes[select.value];
    addItemToCartState(item.name + ' (' + variant.label + ')', variant.price);
}

function changeQty(name, delta){
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
    }
    renderCart();
}

function removeFromCart(name){
    cart = cart.filter(i => i.name !== name);
    renderCart();
}

function renderCart(){
    const container = document.getElementById("cartItems");
    const countEl = document.getElementById("cartCount");
    const subtotalWrap = document.getElementById("cartSubtotal");
    const subtotalAmount = document.getElementById("subtotalAmount");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
    countEl.textContent = totalCount;
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        subtotalWrap.style.display = "none";
        return;
    }

    container.innerHTML = cart.map(item => {
        const safeName = item.name.replace(/'/g, "\\'");
        return `
        <div class="cart-item">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)} each</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQty('${safeName}', -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty('${safeName}', 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart('${safeName}')">✕</button>
            </div>
        </div>`;
    }).join("");

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    subtotalAmount.textContent = "$" + subtotal.toFixed(2);
    subtotalWrap.style.display = "block";
}

/* ---------- CHECKOUT ---------- */
function openCheckout(){
    if (cart.length === 0) return;
    renderCheckoutForm();
    checkoutOverlay.classList.add("open");
    closeCart();
}

function closeCheckout(){
    checkoutOverlay.classList.remove("open");
}

function renderCheckoutForm(){
    const content = document.getElementById("checkoutContent");
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const summaryRows = cart.map(i =>
        `<div class="order-summary-row"><span>${i.qty} × ${i.name}</span><span>$${(i.price * i.qty).toFixed(2)}</span></div>`
    ).join("");

    content.innerHTML = `
        <h3>Checkout</h3>
        <div class="order-summary">
            ${summaryRows}
            <div class="order-summary-total"><span>Total</span><span>$${subtotal.toFixed(2)}</span></div>
        </div>
        <form class="checkout-form" id="checkoutForm" onsubmit="handleCheckoutSubmit(event)">
            <label for="custName">Full Name</label>
            <input type="text" id="custName" required>

            <label for="custEmail">Email</label>
            <input type="email" id="custEmail" required>

            <label for="custPhone">Phone Number</label>
            <input type="tel" id="custPhone" required>

            <label for="pickupDay">Pickup Day</label>
            <input type="date" id="pickupDay" min="${window.PICKUP_MIN}" max="${window.PICKUP_MAX}" required>
            <div class="field-error" id="pickupError">We're closed Sundays — please choose another day.</div>

            <button type="submit" class="place-order-btn">Place Order</button>
        </form>
    `;
}

async function handleCheckoutSubmit(e){
    e.preventDefault();

    const pickupInput = document.getElementById("pickupDay");
    const pickupError = document.getElementById("pickupError");
    const pickupDate = new Date(pickupInput.value + "T00:00:00");

    if (pickupDate.getDay() === 0) {
        pickupError.style.display = "block";
        return;
    }
    pickupError.style.display = "none";

    const name = document.getElementById("custName").value;
    const email = document.getElementById("custEmail").value;
    const phone = document.getElementById("custPhone").value;
    const pickupFormatted = pickupDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const submitBtn = e.target.querySelector(".place-order-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Placing order...";

    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                phone,
                pickupDate: pickupInput.value,
                items: cart,
                total,
                menuSlug: window.CURRENT_SEASONAL_SLUG
            })
        });

        if (!response.ok) {
            throw new Error("Server rejected the order");
        }

        showConfirmation(name, pickupFormatted);

    } catch (err) {
        console.error(err);
        submitBtn.disabled = false;
        submitBtn.textContent = "Place Order";
        alert("Something went wrong placing your order. Please try again, or call us directly.");
    }
}

function showConfirmation(name, pickupFormatted){
    const content = document.getElementById("checkoutContent");
    content.innerHTML = `
        <div class="confirmation">
            <div class="checkmark">${window.CONFIRMATION_EMOJI || "🎉"}</div>
            <h3>Order Received!</h3>
            <p>Thanks, ${name}! Your order is confirmed for pickup on <strong>${pickupFormatted}</strong>. We'll see you then.</p>
            <button class="done-btn" onclick="finishCheckout()">Done</button>
        </div>
    `;
}

function finishCheckout(){
    cart = [];
    renderCart();
    closeCheckout();
}

/* ---------- SEASONAL MENU STATUS ---------- */
// Fails open: if this check itself errors, the menu stays visible rather
// than risk silently blocking every customer due to a glitch.
async function checkMenuStatus(){
    try {
        const res = await fetch("/api/seasonal-menus");
        if (!res.ok) return;

        const menus = await res.json();
        const thisMenu = menus.find(m => m.slug === window.CURRENT_SEASONAL_SLUG);

        if (thisMenu && !thisMenu.enabled) {
            document.getElementById("menuContent").style.display = "none";
            document.getElementById("menuClosedMessage").style.display = "block";
            cartToggleEl.style.display = "none";
        }
    } catch (err) {
        console.error(err);
    }
}

checkMenuStatus();
