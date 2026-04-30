let cart = JSON.parse(localStorage.getItem("meuCarrinho")) || [];

function renderizarCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    
    cartItems.innerHTML = "";
    let totalValue = 0;

    // Adicionamos o 'index' no forEach para saber qual item é qual
    cart.forEach((item, index) => {
        totalValue += item.price;
        const div = document.createElement("div");
        div.className = "cart-item";
        
        div.innerHTML = `
            <div class="item-info">
                <span>${item.name}</span>
                <span class="item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</span>
            </div>
            <button class="btn-remove" onclick="removerItem(${index})">Remover</button>
        `;
        cartItems.appendChild(div);
    });

    totalElement.textContent = totalValue.toFixed(2).replace(".", ",");
}

function removerItem(index) {
    // Remove 1 item na posição do índice clicado
    cart.splice(index, 1);
    
    // Atualiza o localStorage com a nova lista (sem o item removido)
    localStorage.setItem("meuCarrinho", JSON.stringify(cart));
    
    // Renderiza a tela novamente para mostrar a mudança
    renderizarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem("meuCarrinho");
    window.location.reload();
}

function finalizarPagamento() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio! Adicione alguns produtos antes de pagar.");
        return;
    }

    // Pega o valor do total que já está na tela
    const totalFormatado = document.getElementById("total").textContent;

    // Simulação de processamento
    alert(`Pagamento de R$ ${totalFormatado} processado com sucesso!`);

    // Limpa o carrinho após a compra
    localStorage.removeItem("meuCarrinho");
    
    // Redireciona para a página inicial ou recarrega
    window.location.href = "index.html";
}

renderizarCarrinho();