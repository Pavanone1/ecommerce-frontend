const productDetail = document.getElementById("productDetail");
const cartCount = document.getElementById("cartCount");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    productDetail.innerHTML = `
    <div class="detail-container">
      <img src="${product.image}" alt="${product.title}">
      <div class="detail-info">
        <h1>${product.title}</h1>
        <p class="price">$${product.price}</p>
        <p>${product.description}</p>

        <label>Size:</label>
        <div class="variation-buttons" id="sizeOptions">
          <button data-value="S">S</button>
          <button data-value="M">M</button>
          <button data-value="L">L</button>
        </div>

        <label>Color:</label>
        <div class="variation-buttons" id="colorOptions">
          <button data-value="Red">Red</button>
          <button data-value="Blue">Blue</button>
          <button data-value="Green">Green</button>
        </div>

        <div class="quantity-selector">
          <button id="minusQty">−</button>
          <span id="quantity">1</span>
          <button id="plusQty">+</button>
        </div>

        <button id="addToCartBtn">Add to Cart</button>
        <div id="successMessage" style="display:none;color:green;">Added to cart!</div>
      </div>
    </div>`;

    let quantity = 1;
    let selectedSize = null;
    let selectedColor = null;

    const quantityEl = document.getElementById("quantity");
    const successMessage = document.getElementById("successMessage");

    // Helper to set up variation buttons
    function setupVariation(id, callback) {
      document.getElementById(id).querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          document.getElementById(id).querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          callback(btn.dataset.value);
        });
      });
    }

    setupVariation("sizeOptions", val => selectedSize = val);
    setupVariation("colorOptions", val => selectedColor = val);

    // Quantity buttons
    document.getElementById("plusQty").addEventListener("click", () => {
      quantity++;
      quantityEl.textContent = quantity;
    });
    document.getElementById("minusQty").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });

    // Add to Cart
    document.getElementById("addToCartBtn").addEventListener("click", () => {
      if (!selectedSize || !selectedColor) {
        alert("Please select size and color");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingIndex = cart.findIndex(item =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
          image: product.image
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count in header
      const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = totalQty;

      // Show success message
      successMessage.style.display = "block";
      setTimeout(() => successMessage.style.display = "none", 1500);

      // Reset quantity to 1
      quantity = 1;
      quantityEl.textContent = quantity;
    });

    // Load cart count on page load
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalQty;
  });
