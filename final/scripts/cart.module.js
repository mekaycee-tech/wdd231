// Dynamic Rendering of Local Storage Data on Cart Page
const cartContainer = document.getElementById('cart-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('techpulse_cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartContainer.innerHTML = '';
  
  // Calculate total using Array Method reduce
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>Category: ${item.category} | Price: $${item.price}</p>
      </div>
      <button class="btn remove-btn" data-index="${index}" style="background-color: #d90429;">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.style.marginTop = '1.5rem';
  totalDiv.innerHTML = `
    <h3>Total Amount: $${total}</h3>
    <button class="btn" id="clear-cart-btn" style="margin-top: 1rem;">Clear Cart</button>
  `;
  cartContainer.appendChild(totalDiv);

  // Attach button event handlers
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      removeItem(index);
    });
  });

  document.getElementById('clear-cart-btn').addEventListener('click', () => {
    localStorage.removeItem('techpulse_cart');
    renderCart();
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('techpulse_cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('techpulse_cart', JSON.stringify(cart));
  renderCart();
}

renderCart();