// 1. Inicia o carrinho pegando o que já está salvo no navegador
let cart = JSON.parse(localStorage.getItem("meuCarrinho")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    // Salva no localStorage para a página carrinho.html também ver
    localStorage.setItem("meuCarrinho", JSON.stringify(cart)); 
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

    if (cartItems) cartItems.innerHTML = "";
    
    let totalSoma = 0; // Criamos a variável de soma aqui dentro

    cart.forEach((item) => {
        totalSoma += item.price; // Soma o preço de cada item da lista
        
        if (cartItems) {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2).replace(".", ",")}</span>
            `;
            cartItems.appendChild(div);
        }
    });

    // Atualiza os textos na tela
    if (cartCount) cartCount.textContent = cart.length;
    if (totalElement) totalElement.textContent = totalSoma.toFixed(2).replace(".", ",");
}

// Roda ao carregar a página para mostrar o que já estava no carrinho
updateCart();