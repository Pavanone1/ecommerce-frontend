const productGrid=document.getElementById("productGrid");
const cartCount=document.getElementById("cartCount");

fetch("https://fakestoreapi.com/products")
.then(r=>r.json())
.then(products=>{
productGrid.innerHTML=products.map(p=>`
<div class="product-card">
<a href="product.html?id=${p.id}">
<picture>
  <source srcset="${p.image}" type="image/webp">
  <img src="${p.image}"
       alt="${p.title}"
       loading="lazy"
       width="300"
       height="300">
</picture>
<h3>${p.title}</h3>
</a>
<p class="price">$${p.price}</p>
<button onclick="addToCart(${p.id},'${p.title}',${p.price},'${p.image}')">
Add to Cart
</button>
</div>`).join("");
updateCart();
});

function addToCart(id,title,price,image){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
const i=cart.findIndex(x=>x.id===id);
i>-1?cart[i].quantity++:cart.push({id,title,price,quantity:1,image});
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function updateCart(){
const cart=JSON.parse(localStorage.getItem("cart"))||[];
cartCount.textContent=cart.reduce((a,b)=>a+b.quantity,0);
}
