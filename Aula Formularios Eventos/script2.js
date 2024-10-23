document.getElementById('addSandwich').addEventListener('click', function() {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <select class="sandwich" required>
            <option value="">Selecione um sanduíche</option>
            <option value="Sanduíche 1">Sanduíche 1</option>
            <option value="Sanduíche 2">Sanduíche 2</option>
            <option value="Sanduíche 3">Sanduíche 3</option>
            <option value="Sanduíche 4">Sanduíche 4</option>
            <option value="Sanduíche 5">Sanduíche 5</option>
        </select>
        <input type="number" class="quantity" min="1" placeholder="Quantidade" required>
    `;
    document.querySelector('div.list-container div:first-child').appendChild(item);
});

document.getElementById('addDrink').addEventListener('click', function() {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <select class="drink" required>
            <option value="">Selecione uma bebida</option>
            <option value="Bebida 1">Bebida 1</option>
            <option value="Bebida 2">Bebida 2</option>
            <option value="Bebida 3">Bebida 3</option>
            <option value="Bebida 4">Bebida 4</option>
            <option value="Bebida 5">Bebida 5</option>
        </select>
        <input type="number" class="quantity" min="1" placeholder="Quantidade" required>
    `;
    document.querySelector('div.list-container div:last-child').appendChild(item);
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const sandwiches = Array.from(document.querySelectorAll('.sandwich'))
        .map((select, index) => ({
            name: select.value,
            quantity: document.querySelectorAll('.quantity')[index].value
        })).filter(item => item.name);

    const drinks = Array.from(document.querySelectorAll('.drink'))
        .map((select, index) => ({
            name: select.value,
            quantity: document.querySelectorAll('.quantity')[index + sandwiches.length].value
        })).filter(item => item.name);

    const orderCode = `Nome: ${name}, Pedido: ${JSON.stringify(sandwiches.concat(drinks))}, Código: ${Date.now()}`;

    // Envia pedido para o backend
    fetch('/api/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, orderCode }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('orderConfirmation').textContent = `Código enviado para ${phone}: ${orderCode}`;
        } else {
            document.getElementById('orderConfirmation').textContent = 'Erro ao enviar o código.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    // Limpa os campos do formulário
    this.reset();
});
