// Function to update the cart count in the UI and localStorage
function updateCartCount(count) {
    document.getElementById('cart-count').innerText = count;
    localStorage.setItem('cartCount', count);
}

// Function to add an item to the cart
function addToCart(id, name, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price, img: imgSrc });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart.length);
}

// Function to show product details in the modal
function showProduct(id, name, price, imgSrc) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = `Ár: ${price} Ft`;
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(id, name, price, imgSrc);
    document.getElementById('product-modal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Initialize the cart count from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    let cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
    updateCartCount(cartCount);
});