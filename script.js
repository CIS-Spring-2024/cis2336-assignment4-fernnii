const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let menuItems = [
    { name: "Tacos de Bistec|Al Pastor|Birria", price: 1.49, category: "Tacos", image: "tacos.jpg" },
    { name: "Birria Tacos", price: 1.99, category: "Tacos", image: "birria.jpg" },
    { name: "Fajita Quesadilla", price: 6.99, category: "Quesadilla", image: "quesadilla.jpg" },
    { name: "Burrito with Fajita|Bistec|Al Pastor", price: 6.99, category: "Burrito", image: "burrito.jpg" },
];

// JavaScript (script.js)
document.addEventListener('DOMContentLoaded', () => {
    // Fetch menu items from the server
    fetch('/menu')
        .then(response => response.json())
        .then(menuItems => {
            // Display menu items
            displayMenu(menuItems);
        })
        .catch(error => console.error('Error fetching menu:', error));

    // Function to display menu items
    function displayMenu(menuItems) {
        const menuContainer = document.querySelector('.menu-items');
        menuContainer.innerHTML = ''; // Clear previous items

        menuItems.forEach(item => {
            const menuItem = createMenuItem(item);
            menuContainer.appendChild(menuItem);
        });
    }

    // Function to create menu item element
    function createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.addEventListener('click', () => addToCart(item));

        menuItem.appendChild(itemName);
        menuItem.appendChild(itemPrice);
        menuItem.appendChild(addButton);

        return menuItem;
    }

    // Function to add item to cart
    function addToCart(item) {
        cart.push(item);
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartContainer.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Function to clear cart
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCartDisplay();
    });

    // Cart array to store items
    let cart = [];
});


// Function to handle checkout
function checkout() {
    // Send cart data to the server
    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        // Display order confirmation to the user
        alert(`Order confirmed! Total amount: $${data.total}`);
        // Optionally, clear the cart after successful checkout
        clearCart();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your order. Please try again later.');
    });
}

// Event listener for checkout button
document.getElementById("checkout-button").addEventListener("click", checkout);

// Server-side route to handle fetching menu items

app.get('/menu', (req, res) => {
    res.json(menuItems);
});

// Server-side routes to handle order submission and confirmation
app.post('/order', (req, res) => {
    const formData = req.body;
    // Process form data and calculate total amount
    // Ensure proper error handling and validation
    // Send response accordingly
});

app.get('/order-confirmation', (req, res) => {
    // Display order confirmation web page with total amount
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
