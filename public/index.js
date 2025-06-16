document.getElementById('converter-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const resultadoInput = document.getElementById('resultado');

    const categorias = {
        m: 'distancia',
        km: 'distancia',
        mi: 'distancia',
        ft: 'distancia',
        s: 'tempo',
        min: 'tempo'
    };

    if (isNaN(valor)) {
        resultadoInput.value = "Valor inválido";
        return;
    }

    if (categorias[de] !== categorias[para]) {
        resultadoInput.value = "Conversão entre categorias diferentes";
        return;
    }

    const fatores = {
        m: 1,
        km: 1000,
        mi: 1609.34,
        ft: 0.3048,
        s: 1,
        min: 60
    };

    const valorEmBase = valor * fatores[de];
    const resultado = valorEmBase / fatores[para];
    const textoResultado = `${valor} ${de} = ${resultado.toFixed(4)} ${para}`;

    resultadoInput.value = textoResultado;

    // Envia para o histórico (backend)
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn('Token JWT não encontrado.');
            return;
        }

        await fetch('http://localhost:3000/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                de,
                para,
                valor,
                resultado: resultado.toFixed(4)
            })
        });
    } catch (error) {
        console.error('Erro ao enviar conversão ao histórico:', error);
    }
});
