let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Kosár megjelenítése
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>A kosár üres.</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img">
                    <span class="cart-item-text">${item.name} - ${item.price} Ft</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
                </div>
            `;
        });
    }

    document.getElementById("total-price").innerText = `Összesen: ${total} Ft`;
}

// Termék eltávolítása a kosárból
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Kosár ürítése
function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
}

// Show order modal
function showOrderModal() {
    if (cart.length === 0) {
        document.getElementById("empty-cart-modal").style.display = "flex";
    } else {
        document.getElementById("order-modal").style.display = "flex";
        document.getElementById("order-modal").style.justifyContent = "center";
        document.getElementById("order-modal").style.alignItems = "center";
    }
}

// Close order modal
function closeOrderModal() {
    document.getElementById("order-modal").style.display = "none";
}

// Close empty cart modal
function closeEmptyCartModal() {
    document.getElementById("empty-cart-modal").style.display = "none";
}

// Submit order
function submitOrder() {
    const name = document.querySelector('input[name="name"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const zip = document.querySelector('input[name="zip"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    alert(`Megrendelés elküldve!\n\nNév: ${name}\nCím: ${address}\nVáros: ${city}\nIrányítószám: ${zip}\nTelefon: ${phone}\nFizetési mód: ${payment}`);
    closeOrderModal();
    clearCart();
}

displayCart();