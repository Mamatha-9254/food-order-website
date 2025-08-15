
const menuItems = [
    { name: "Cheese Burger", price: 150, img: "burger.jpeg", category: "Burger" },
    { name: "Veg Pizza", price: 250, img:"piz.jpeg", category: "Pizza" },
    { name: "White Sauce Pasta", price: 200, img: "pasta.jpeg", category: "Pasta" },
    { name: "Club Sandwich", price: 120, img: "sandwich.jpeg", category: "Sandwich" },
    { name: "French Fries", price: 100, img: "french fries.jpeg", category: "Snacks" },
    { name: "Chicken Roll", price: 180, img: "chicken roll.jpeg", category: "Roll" },
    { name: "Cold Coffee", price: 90, img: "cofee.jpeg", category: "Drinks" },
    { name: "Chocolate Shake", price: 110, img: "shake.jpeg", category: "Drinks" },
    { name: "Brownie", price: 80, img: "browine.jpeg", category: "Desserts" },
    { name: "Ice Cream", price: 70, img: "ice.jpeg", category: "Desserts" }
];

let cart = [];
let total = 0;

function displayMenu(items) {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("food-card");
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>₹${item.price}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menu.appendChild(card);
    });
}

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    document.getElementById("cart-count").innerText = cart.length;
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach((c, index) => {
        const li = document.createElement("li");
        li.textContent = `${c.item} - ₹${c.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    document.getElementById("total-price").innerText = total;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    document.getElementById("cart-count").innerText = cart.length;
    updateCartUI();
}

document.getElementById("cart-btn").onclick = () => {
    document.getElementById("cart-sidebar").classList.add("open");
};

document.getElementById("close-cart").onclick = () => {
    document.getElementById("cart-sidebar").classList.remove("open");
};

document.getElementById("place-order").onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you! Your order has been placed.");
    cart = [];
    total = 0;
    document.getElementById("cart-count").innerText = 0;
    updateCartUI();
    document.getElementById("cart-sidebar").classList.remove("open");
};

document.getElementById("search").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText)
    );
    displayMenu(filtered);
});

// Display menu initially
displayMenu(menuItems);
