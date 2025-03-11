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

// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Function to close the dropdown menu
function closeDropdown() {
    document.getElementById('dropdown-menu').style.display = 'none';
}

// Function to navigate to the contact page
function navigateToContact() {
    window.location.href = 'contact.html';
}

// Function to navigate to the home page
function navigateToHome() {
    window.location.href = 'index.html';
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#menu-button')) {
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
}

// Add event listener to the menu button
document.getElementById('menu-button').addEventListener('click', toggleDropdown);

// Add event listener to the contact link
document.querySelector('#dropdown-menu a[href="#contact"]').addEventListener('click', () => {
    navigateToContact();
    closeDropdown();
});

// Add event listener to the home link
document.querySelector('#dropdown-menu a[href="index.html"]').addEventListener('click', () => {
    navigateToHome();
    closeDropdown();
});

// Add event listeners to close the dropdown menu after a selection is made
document.querySelectorAll('#dropdown-menu a').forEach(link => {
    link.addEventListener('click', closeDropdown);
});