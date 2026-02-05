const items=document.getElementById("cartItems");
const totalEl=document.getElementById("cartTotal");
let cart=JSON.parse(localStorage.getItem("cart"))||[];

function render(){
items.innerHTML="";
let total=0;
cart.forEach((i,idx)=>{
total+=i.price*i.quantity;
items.innerHTML+=`
<div class="cart-item">
<img src="${i.image}" loading="lazy">
${i.title} x ${i.quantity}
<button onclick="removeItem(${idx})">X</button>
</div>`;
});
totalEl.textContent=`Total: $${total.toFixed(2)}`;
}
function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
render();
}
render();
