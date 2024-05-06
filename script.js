document.addEventListener("DOMContentLoaded", function() {
    
    document.querySelectorAll(".btnAdd").forEach(function(button) {
        button.addEventListener('click', function() {
            let imageSrc = this.parentElement.querySelector("img").getAttribute("src");
            console.log("img source", imageSrc);
            let product = {
                name: this.parentElement.querySelector("h3").textContent,
                price: this.parentElement.querySelector("p").textContent.split(":")[1].trim(),
                image: this.parentElement.querySelector("img").getAttribute("src")
            };
            addToCart(product);
            this.style.backgroundColor = "Grey";
            this.textContent = "Added";
            console.log("Product Added successfully");
        });
    });

    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
    }

    function displayCart() {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let cartContainer = document.getElementById("cart-items");
        if (cartContainer) {
            cartContainer.innerHTML = "";
            cartItems.forEach(function(item) {
                let card = document.createElement("div");
                card.classList.add("cart-items");

                let productImage = document.createElement("img");
                productImage.src = item.image;
                productImage.alt = item.name;
                console.log(productImage);
                card.appendChild(productImage);

                let productDetails = document.createElement("p");
                productDetails.textContent = item.name + " -$" + item.price;
                card.appendChild(productDetails);

                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.addEventListener('click', function() {
                    removeFromCart(item.name);
                });
                card.appendChild(removeButton);
                cartContainer.appendChild(card);

            });
        }
    }
    document.querySelectorAll('form#searchForm').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let searchTerm = form.querySelector('#searchInput').value.trim().toLowerCase();
            let productItems = document.querySelectorAll('.product-item');
            productItems.forEach(function(item) {
                let itemName = item.getAttribute('value');
                if (itemName && itemName.toLowerCase().includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    

    function removeFromCart(productName) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let index = cartItems.findIndex(item => item.name === productName);
        if (index != -1) {
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCart();
        }
    }
    
    function clearcart() {
        localStorage.removeItem('cart');
        displayCart();
    }

    document.getElementById("clearcart").addEventListener("click", clearcart);

    window.onload = displayCart;
});
