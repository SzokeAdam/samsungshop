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

function showProduct(id, name, price, imgSrc, description, specs) {
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = `Ár: ${price} Ft`;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-specs-table').innerHTML = specsToTable(specs);
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(id, name, price, imgSrc);
    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
    modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.5s ease-out'; // Use updated animation
}

function specsToTable(specs) {
    const specsArray = specs.split(', ');
    let tableContent = '<tr><th>Tulajdonság</th><th>Érték</th></tr>';
    specsArray.forEach(spec => {
        const [key, value] = spec.split(': ');
        tableContent += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
    });
    return tableContent;
}

function closeModal(event) {
    if (event) {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent.contains(event.target)) {
            document.getElementById('product-modal').style.display = 'none';
        }
    } else {
        document.getElementById('product-modal').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
    updateCartCount(cartCount);

    if (localStorage.getItem("isLoggedIn") === "true") {
        document.getElementById("login-button").innerText = "Kijelentkezés";
        document.getElementById("login-button").addEventListener("click", logout);
    } else {
        document.getElementById('login-button').addEventListener('click', showLoginModal);
    }

    document.getElementById('close-login-modal').addEventListener('click', closeLoginModal);
    document.getElementById('send-2fa-code').addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        send2FACode(email);
    });
    document.getElementById('user-icon').addEventListener('click', toggleDropdown);
    document.getElementById('dropdown-menu').style.display = 'none';
});

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    const userIcon = document.getElementById('user-icon');
    const rect = userIcon.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom}px`;
    dropdown.style.left = `${rect.left - 100}px`; // Adjust the left position to be more to the left
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

window.addEventListener("click", function(event) {
    const menu = document.getElementById("dropdown-menu");
    const userIcon = document.getElementById("user-icon");
    if (menu.style.display === "block" && !menu.contains(event.target) && event.target !== userIcon) {
        closeDropdown();
    }
});

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Sikeresen kijelentkeztél!");
    location.reload();
}

function send2FACode(email) {
    if (!email || !email.includes('@')) {
        alert("Kérlek, adj meg egy érvényes e-mail címet!");
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('2faCode', code);

    const templateParams = {
        to_email: email,
        code: code
    };

    emailjs.send('service_x9kpyrk', 'template_r95zm1a', templateParams)
        .then((response) => {
            console.log("✅ 2FA kód sikeresen elküldve:", response);
            alert(`2FA kód elküldve erre az e-mail címre: ${email}`);
        })
        .catch((error) => {
            console.error("❌ Hiba a 2FA kód küldésekor:", error);
            alert("Nem sikerült elküldeni a 2FA kódot. Próbáld újra!");
        });
}

function verify2FACode() {
    const userCode = document.getElementById('2fa-code').value;
    const storedCode = localStorage.getItem('2faCode');

    if (userCode === storedCode) {
        alert("✅ Sikeres bejelentkezés!");
        localStorage.setItem('isLoggedIn', 'true');
        closeLoginModal();
    } else {
        alert("❌ Hibás 2FA kód!");
    }
}

function toggleCardDetails(showCardDetails, showPaypalDetails, showCodFee) {
    const cardDetails = document.getElementById('card-details');
    const paypalDetails = document.getElementById('paypal-details');
    const codFee = document.getElementById('cod-fee');
    const map = document.getElementById('map');
    cardDetails.style.display = showCardDetails ? 'block' : 'none';
    paypalDetails.style.display = showPaypalDetails ? 'block' : 'none';
    codFee.style.display = showCodFee ? 'inline' : 'none';
    map.style.display = showCodFee ? 'block' : 'none';
}

function submitOrder() {
    const name = document.querySelector('input[name="name"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const zip = document.querySelector('input[name="zip"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    let cardNumber = '';
    let expiryDate = '';
    let cvc = '';
    let paypalEmail = '';

    if (payment === 'credit-card') {
        cardNumber = document.querySelector('input[name="card-number"]').value;
        expiryDate = document.querySelector('input[name="expiry-date"]').value;
        cvc = document.querySelector('input[name="cvc"]').value;
    } else if (payment === 'paypal') {
        paypalEmail = document.querySelector('input[name="paypal-email"]').value;
    }

    alert(`Megrendelés elküldve!\n\nNév: ${name}\nCím: ${address}\nVáros: ${city}\nIrányítószám: ${zip}\nTelefon: ${phone}\nFizetési mód: ${payment}\nKártyaszám: ${cardNumber}\nLejárati dátum: ${expiryDate}\nCVC: ${cvc}\nPayPal Email: ${paypalEmail}`);
    closeOrderModal();
    clearCart();
}


