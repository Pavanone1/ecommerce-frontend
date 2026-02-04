const API_URL = "https://fakestoreapi.com/products";

const productGrid = document.getElementById("product-grid");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

let cachedProducts = null;

async function fetchProducts() {
  loading.style.display = "block";
  errorBox.textContent = "";

  try {
    if (cachedProducts) {
      renderProducts(cachedProducts);
      loading.style.display = "none";
      return;
    }

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API error");
    }

    const products = await response.json();
    cachedProducts = products;

    renderProducts(products);

  } catch (error) {
    errorBox.textContent = "Failed to load products. Please try again.";
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>₹ ${Math.round(product.price * 80)}</p>
        <button onclick="addToCart()">Add to Cart</button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function addToCart() {
  alert("Product added to cart!");
}

fetchProducts();
