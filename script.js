async function iniciarGeracao() {
    const chave = document.querySelector('input[type="text"]').value;
    const tema = document.querySelector('textarea').value;
    const status = document.getElementById('statusTexto');
    const resultado = document.getElementById('roteiroFinal');

    if (!chave || !tema) {
        alert("Por favor, cole sua chave API e digite um tema!");
        return;
    }

    status.innerText = "O Agente está escrevendo seu roteiro... aguarde.";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${chave}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Escreva um roteiro detalhado sobre: ${tema}` }] }]
            })
        });

        const data = await response.json();
        const textoGerado = data.candidates[0].content.parts[0].text;
        
        resultado.innerText = textoGerado;
        status.innerText = "Roteiro Gerado com Sucesso!";
    } catch (error) {
        status.innerText = "Erro na geração. Verifique sua chave e conexão.";
        console.error(error);
    }
}
