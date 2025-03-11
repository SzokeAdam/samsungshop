
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
                    <img src="${item.img}" width="50">
                    <span>${item.name} - ${item.price} Ft</span>
                    <button class="mas_gomb" onclick="removeFromCart(${index})" >❌</button>
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

displayCart();