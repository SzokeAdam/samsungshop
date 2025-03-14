function updateCartCount(count) {
    document.getElementById('cart-count').innerText = count;
    localStorage.setItem('cartCount', count);
}

function addToCart(id, name, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price, img: imgSrc });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart.length);
}

function showProduct(id, name, price, imgSrc) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = `Ár: ${price} Ft`;
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(id, name, price, imgSrc);
    document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    let cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
    updateCartCount(cartCount);

    document.getElementById('login-button').addEventListener('click', showLoginModal);
    document.getElementById('close-login-modal').addEventListener('click', closeLoginModal);
    document.getElementById('send-2fa-code').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        send2FACode(email);
    });
    document.getElementById('verify-2fa-code').addEventListener('click', verify2FACode);
    document.getElementById('menu-button').addEventListener('click', toggleDropdown);

    // Ensure the dropdown menu is hidden on page load
    document.getElementById('dropdown-menu').style.display = 'none';
});

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function closeDropdown() {
    document.getElementById('dropdown-menu').style.display = 'none';
}

function navigateToContact() {
    window.location.href = 'contact.html';
}

function navigateToHome() {
    window.location.href = 'index.html';
}

window.onclick = function(event) {
    if (!event.target.matches('#menu-button')) {
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
}

document.querySelector('#dropdown-menu a[href="contact.html"]').addEventListener('click', () => {
    navigateToContact();
    closeDropdown();
});

document.querySelector('#dropdown-menu a[href="index.html"]').addEventListener('click', () => {
    navigateToHome();
    closeDropdown();
});

document.querySelectorAll('#dropdown-menu a').forEach(link => {
    link.addEventListener('click', closeDropdown);
});

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function send2FACode(email) {
    // Simulate sending a 2FA code
    const code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('2faCode', code);
    alert(`2FA code sent to ${email}: ${code}`);
}

function verify2FACode() {
    const enteredCode = document.getElementById('2fa-code').value;
    const storedCode = localStorage.getItem('2faCode');
    if (enteredCode == storedCode) {
        alert('Login successful!');
        closeLoginModal();
    } else {
        alert('Invalid 2FA code.');
    }
}