document.addEventListener("DOMContentLoaded", function() {
    let cartproducts = document.getElementById("your-cart");
    let totalbox = document.getElementById("yourtotal");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function showCart() {
        if(cart.length === 0){
            cartproducts.innerHTML = `<p class="text-danger">Your cart is empty</p>`;
            totalbox.innerHTML = "";
            return;
        }

        let str = "";
        let total = 0;
cart.forEach(item => {
    total += item.price * item.quantity;
    str += `
    <div class="col-12 mb-3">
        <div class="card d-flex flex-row align-items-center p-3" style="min-height:180px;">
            <img src="${item.thumbnail}" 
                 alt="${item.name}" 
                 class="img-fluid rounded" 
                 style="width:180px; height:150px; object-fit:cover;">

            <div class="card-body ms-4">
                <h5 class="card-title">${item.name}</h5>
                <p>Price: $${item.price}</p>

                <div class="d-flex align-items-center mb-3">
                    <button class="btn btn-secondary me-2" onclick="decreaseQty(${item.id})">-</button>
                    <span class="fw-bold text-dark">${item.quantity}</span>
                    <button class="btn btn-secondary ms-2" onclick="increaseQty(${item.id})">+</button>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <p class="fw-bold mb-0">Subtotal: $${item.price * item.quantity}</p>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    </div>`;
});

        cartproducts.innerHTML = str;
        totalbox.innerText = "Total Price: $" + total;
    }

    window.removeItem = function(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        showCart();
    }

    window.increaseQty = function(id) {
        let item = cart.find(p => p.id === id);
        if(item) {
            item.quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        }
    }

    window.decreaseQty = function(id) {
        let item = cart.find(p => p.id == id);
        if(item && item.quantity > 1) {
            item.quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
            showCart();
        } else if(item && item.quantity ==1) {
            removeItem(id); // agar quantity 1 ho aur - dabaya to remove
        }
    }

    showCart();
});
