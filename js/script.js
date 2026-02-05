const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <h3>${product.title}</h3>
        </a>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
      </div>
    `).join("");
  });

function addToCart(id, title, price, image){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex(item => item.id===id && !item.size && !item.color);
  if(existingIndex >=0){ cart[existingIndex].quantity +=1; }
  else { cart.push({id,title,price,quantity:1,image}); }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.reduce((acc,item)=>acc+item.quantity,0);
}

updateCart();
