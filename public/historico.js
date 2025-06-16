// Função para carregar o histórico do usuário
async function carregarHistorico() {
  const lista = document.querySelector(".lista-entradas");
  lista.innerHTML = "<p>Carregando...</p>";

  try {
    // Recupera o token salvo no login
    const token = localStorage.getItem("token");

    if (!token) {
      lista.innerHTML = "<p>Você precisa estar logado para ver o histórico.</p>";
      return;
    }

    // Requisição GET para /history com o token
    const response = await fetch("http://localhost:3000/history", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        lista.innerHTML = "<p>Sessão expirada. Faça login novamente.</p>";
      } else {
        lista.innerHTML = "<p>Erro ao carregar histórico.</p>";
      }
      return;
    }

    const historico = await response.json();

    if (!historico.length) {
      lista.innerHTML = "<p>Nenhum registro encontrado.</p>";
      return;
    }

    // Limpa lista e insere os registros
    lista.innerHTML = "";
    historico.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("entrada-historico");

      itemDiv.innerHTML = `
        <strong>${item.action}</strong><br>
        <small>${new Date(item.timestamp).toLocaleString()}</small><br>
        <span>${item.details || ""}</span>
        <hr>
      `;

      lista.appendChild(itemDiv);
    });

  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    lista.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
  }
}

// Chama a função ao carregar a página
window.addEventListener("DOMContentLoaded", carregarHistorico);


