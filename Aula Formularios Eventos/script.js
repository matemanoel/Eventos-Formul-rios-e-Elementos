document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const sandwich = document.getElementById('sandwich').value;
        const drink = document.getElementById('drink').value;
        const orderCode = `Pedido: ${sandwich} + ${drink} - Código: ${Date.now()}`;

        // Exibe a confirmação do pedido
        document.getElementById('orderConfirmation').textContent = orderCode;

        // Limpa os campos do formulário
        this.reset();
    });
});
