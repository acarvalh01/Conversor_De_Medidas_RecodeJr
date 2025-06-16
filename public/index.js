// index.js - Lógica da página do conversor

document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Pega os valores
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const resultadoInput = document.getElementById('resultado');

    if (isNaN(valor)) {
        resultadoInput.value = "Valor inválido";
        return;
    }

    let resultado;

    // Lógica de conversão
    if (de === 'Minuto' && para === 'Segundos') {
        resultado = valor * 60;
        resultadoInput.value = resultado + " segundos";
    } else {
        resultadoInput.value = "Conversão não suportada";
    }
});
