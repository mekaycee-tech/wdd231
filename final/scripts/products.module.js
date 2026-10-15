// Array to store fetched product items
let products = [];

// DOM Element Selectors
const productContainer = document.getElementById('product-container');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCountSpan = document.getElementById('cart-count');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

// Hamburger Menu Toggle
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Fetch JSON Data using Async / Await with try...catch
async function fetchProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error('Failed to load JSON data source.');
    }
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Data Fetch Error:', error);
    productContainer.innerHTML = `<p>Error loading product data. Please try again later.</p>`;
  }
}

// Display products dynamically using Template Literals
function displayProducts(items) {
  productContainer.innerHTML = '';
  
  if (items.length === 0) {
    productContainer.innerHTML = '<p>No products matched your criteria.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Lazy loading image technique for performance
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
      <h3>${item.name}</h3>
      <p>Category: ${item.category}</p>
      <p>Rating: ⭐ ${item.rating}</p>
      <p class="price">$${item.price}</p>
      <button class="btn view-details" data-id="${item.id}">View Details</button>
      <button class="btn add-cart" data-id="${item.id}">Add to Cart</button>
    `;
    
    productContainer.appendChild(card);
  });

  attachButtonEvents();
}

// Array Methods (filter) for search & category filters
function filterProducts() {
  const selectedCategory = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(item => {
    const matchesCategory = (selectedCategory === 'All') || (item.category === selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  displayProducts(filtered);
}

// Event Listeners for Filters
if (categoryFilter && searchInput) {
  categoryFilter.addEventListener('change', filterProducts);
  searchInput.addEventListener('input', filterProducts);
}

// Attach Event Listeners to generated buttons
function attachButtonEvents() {
  const detailButtons = document.querySelectorAll('.view-details');
  const cartButtons = document.querySelectorAll('.add-cart');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      openModal(id);
    });
  });

  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });
}

// Open Modal Dialog
function openModal(id) {
  const item = products.find(prod => prod.id === id);
  if (item && modal) {
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-category').textContent = `Category: ${item.category}`;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = `Price: $${item.price}`;
    modal.showModal();
  }
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => modal.close());
}

// Local Storage for Cart Items
function addToCart(id) {
  const item = products.find(prod => prod.id === id);
  let cart = JSON.parse(localStorage.getItem('techpulse_cart')) || [];
  
  cart.push(item);
  localStorage.setItem('techpulse_cart', JSON.stringify(cart));
  
  updateCartCount();
  alert(`${item.name} added to cart!`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('techpulse_cart')) || [];
  if (cartCountSpan) {
    cartCountSpan.textContent = cart.length;
  }
}

// Initializing application
fetchProducts();
updateCartCount();