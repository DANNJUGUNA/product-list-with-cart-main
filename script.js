let cart = {};

async function loadDesserts() {
  const res = await fetch('data.json');
  const data = await res.json();
  const container = document.getElementById('dessert-list');

  data.desserts.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
     <div class="top">
      <img class="itemimg" src="${item.image.tablet}" alt="${item.name}">
      <button class="add-btn" onclick="addToCart(${index})">
      <span> <img id="addcart"src="./images/icon-add-to-cart.svg" alt="add cart" size=[12]><span>
       Add to Cart</button>
     </div>
      <div class="bottom">
      <p>${item.category}</p>
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      </div>
    `;

    container.appendChild(card);
  });

  window.desserts = data.desserts;
}

function addToCart(index) {
  const dessert = window.desserts[index];
  const key = dessert.name;
  if (!cart[key]) {
    cart[key] = { ...dessert, quantity: 0 };
  }
  cart[key].quantity += 1;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const count = document.getElementById('cart-count');
  const totalPrice = document.getElementById('total-price');

  cartList.innerHTML = '';
  let total = 0;
  let itemsCount = 0;

  for (const key in cart) {
    const item = cart[key];
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    itemsCount += item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (${item.quantity}× $${item.price.toFixed(2)}) 
      <span>$${itemTotal.toFixed(2)}</span>
    `;
    cartList.appendChild(li);
  }

  count.textContent = itemsCount;
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

document.getElementById('confirm-order').onclick = () => {
  alert('Order confirmed!');
};

loadDesserts();
