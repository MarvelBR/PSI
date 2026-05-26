// Variáveis globais
let currentMood = null;
let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

/**
 * Inicializa comportamentos comuns das paginas HTML antigas.
 *
 * Entrada:
 * - nao recebe parametros; usa o DOM carregado.
 *
 * Variaveis usadas:
 * - hamburger: botao do menu mobile.
 * - navMenu: lista de links do menu.
 *
 * Saida:
 * - eventos de clique configurados e dados salvos carregados na tela.
 */
function initializeApp() {
  // Configurar navegação mobile
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Fechar menu mobile ao clicar em link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger?.classList.remove("active");
      navMenu?.classList.remove("active");
    });
  });

  // Carregar dados salvos
  loadSavedData();
}

// Funções de humor
/**
 * Seleciona um humor, salva no historico e exibe feedback visual.
 *
 * Entrada:
 * - mood: classe/id do humor escolhido, como happy, neutral, sad ou anxious.
 *
 * Variaveis usadas:
 * - currentMood: humor atual da pagina.
 * - botoes .mood-btn: recebem ou perdem a classe selected.
 *
 * Saida:
 * - humor marcado na tela, historico salvo e notificacao exibida.
 */
function selectMood(mood) {
  currentMood = mood;

  // Remover seleção anterior
  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Adicionar seleção atual
  document.querySelector(`.mood-btn.${mood}`).classList.add("selected");

  // Salvar humor
  saveMood(mood);

  // Mostrar feedback
  showMoodFeedback(mood);
}

/**
 * Salva um humor no historico local do navegador.
 *
 * Entrada:
 * - mood: humor escolhido pelo usuario.
 *
 * Variaveis usadas:
 * - moodEntry: novo registro com humor, data ISO e timestamp.
 * - moodHistory: lista global dos registros de humor.
 *
 * Saida:
 * - localStorage moodHistory atualizado com no maximo 30 itens.
 */
function saveMood(mood) {
  const moodEntry = {
    mood: mood,
    date: new Date().toISOString(),
    timestamp: Date.now(),
  };

  moodHistory.unshift(moodEntry);

  // Manter apenas os últimos 30 registros
  if (moodHistory.length > 30) {
    moodHistory = moodHistory.slice(0, 30);
  }

  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
}

/**
 * Mostra uma notificacao temporaria conforme o humor selecionado.
 *
 * Entrada:
 * - mood: chave usada para buscar a mensagem em messages.
 *
 * Variaveis usadas:
 * - messages: mapa de textos por humor.
 * - notification: div criada dinamicamente no body.
 *
 * Saida:
 * - notificacao adicionada ao DOM e removida apos alguns segundos.
 */
function showMoodFeedback(mood) {
  const messages = {
    happy: "Que bom que você está se sentindo bem! Continue assim! 😊",
    neutral: "Está tudo bem ter dias normais. Como posso ajudar? 😌",
    sad: "Sinto muito que você esteja triste. Lembre-se que isso vai passar. 💙",
    anxious: "Respire fundo. Você não está sozinho nessa. 🌸",
  };

  // Criar notificação temporária
  const notification = document.createElement("div");
  notification.className = "mood-notification";
  notification.textContent = messages[mood];
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Navegação
/**
 * Redireciona o navegador para outra pagina HTML.
 *
 * Entrada:
 * - page: caminho ou URL de destino.
 *
 * Saida:
 * - window.location.href alterado para a pagina indicada.
 */
function navigateTo(page) {
  window.location.href = page;
}

// Funções de formulário
/**
 * Le o formulario de humor, salva os dados e limpa os campos.
 *
 * Entrada:
 * - nao recebe parametros; busca o formulario #moodForm no DOM.
 *
 * Variaveis usadas:
 * - formData: dados capturados do formulario.
 * - moodData: objeto final salvo.
 * - moodRecords: registros anteriores do localStorage.
 *
 * Saida:
 * - moodRecords atualizado, mensagem de sucesso exibida e formulario resetado.
 */
function submitMoodForm() {
  const form = document.getElementById("moodForm");
  if (!form) return;

  const formData = new FormData(form);
  const moodData = {
    date: formData.get("date"),
    positiveEmotions: formData.get("positiveEmotions"),
    negativeEmotions: formData.get("negativeEmotions"),
    situation: formData.get("situation"),
    thoughts: formData.get("thoughts"),
    reaction: formData.get("reaction"),
    timestamp: Date.now(),
  };

  // Salvar dados
  let moodRecords = JSON.parse(localStorage.getItem("moodRecords")) || [];
  moodRecords.unshift(moodData);
  localStorage.setItem("moodRecords", JSON.stringify(moodRecords));

  // Mostrar sucesso
  showSuccessMessage("Registro de humor salvo com sucesso!");

  // Limpar formulário
  form.reset();
}

/**
 * Le o formulario do plano de seguranca e salva no navegador.
 *
 * Entrada:
 * - nao recebe parametros; busca #safetyPlanForm no DOM.
 *
 * Variaveis usadas:
 * - formData: dados capturados do formulario.
 * - safetyPlan: objeto com respostas das etapas e timestamp.
 *
 * Saida:
 * - localStorage safetyPlan atualizado e mensagem de sucesso exibida.
 */
function submitSafetyPlan() {
  const form = document.getElementById("safetyPlanForm");
  if (!form) return;

  const formData = new FormData(form);
  const safetyPlan = {
    warningSignals: formData.get("warningSignals"),
    copingStrategies: formData.get("copingStrategies"),
    socialSupport: formData.get("socialSupport"),
    professionalContacts: formData.get("professionalContacts"),
    safeEnvironment: formData.get("safeEnvironment"),
    reasonsToLive: formData.get("reasonsToLive"),
    timestamp: Date.now(),
  };

  // Salvar plano
  localStorage.setItem("safetyPlan", JSON.stringify(safetyPlan));

  // Mostrar sucesso
  showSuccessMessage("Plano de segurança salvo com sucesso!");
}

/**
 * Exibe uma mensagem temporaria de sucesso no topo do conteudo.
 *
 * Entrada:
 * - message: texto que sera exibido ao usuario.
 *
 * Variaveis usadas:
 * - successDiv: elemento criado para a mensagem.
 * - container: elemento .main-content que recebe a mensagem.
 *
 * Saida:
 * - mensagem inserida no DOM e removida depois de 3 segundos.
 */
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;

  const container = document.querySelector(".main-content");
  container.insertBefore(successDiv, container.firstChild);

  // Remover após 3 segundos
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Carregar dados salvos
/**
 * Carrega dados salvos no navegador para preencher a pagina atual.
 *
 * Entrada:
 * - nao recebe parametros; usa moodHistory e localStorage.
 *
 * Variaveis usadas:
 * - lastMood: ultimo humor registrado.
 * - timeDiff: diferenca entre agora e o registro.
 * - safetyForm/savedPlan: formulario e plano salvos.
 *
 * Saida:
 * - humor recente marcado e formulario de plano preenchido quando existir.
 */
function loadSavedData() {
  // Carregar último humor
  if (moodHistory.length > 0) {
    const lastMood = moodHistory[0];
    const timeDiff = Date.now() - lastMood.timestamp;

    // Se foi registrado nas últimas 6 horas, mostrar
    if (timeDiff < 6 * 60 * 60 * 1000) {
      const moodBtn = document.querySelector(`.mood-btn.${lastMood.mood}`);
      if (moodBtn) {
        moodBtn.classList.add("selected");
        currentMood = lastMood.mood;
      }
    }
  }

  // Carregar plano de segurança se estiver na página
  const safetyForm = document.getElementById("safetyPlanForm");
  if (safetyForm) {
    const savedPlan = JSON.parse(localStorage.getItem("safetyPlan"));
    if (savedPlan) {
      Object.keys(savedPlan).forEach((key) => {
        const input = safetyForm.querySelector(`[name="${key}"]`);
        if (input && savedPlan[key]) {
          input.value = savedPlan[key];
        }
      });
    }
  }
}

/**
 * Limpa um campo de texto e devolve o foco para ele.
 *
 * Entrada:
 * - input: elemento de formulario que sera limpo.
 *
 * Saida:
 * - input.value vazio e foco aplicado no campo.
 */
function clearInput(input){
  input.value = '';
  input.focus();
}

/**
 * Renderiza uma lista de pacientes no container informado.
 *
 * Entrada:
 * - container: elemento DOM que recebera os itens.
 * - dataItems: array de pacientes com name e age.
 *
 * Variaveis usadas:
 * - itemDiv/contentDiv/buttonsDiv: elementos criados para cada paciente.
 * - navigateTo: funcao chamada pelos botoes de registro e plano.
 *
 * Saida:
 * - container preenchido com os cards/list items dos pacientes.
 */
function renderList(container, dataItems) {
  // Clear existing content to prevent duplicates on re-render
  container.innerHTML = '';

  // Loop through the data array
  dataItems.forEach(item => {
      // Create the main item div with class 'item-list'
      const itemDiv = document.createElement('div');
      itemDiv.className = 'list-item';

      // Create the pfp-div
      const pfpDiv = document.createElement('div');
      pfpDiv.className = 'pfp-div';
      const pfpIcon = document.createElement('i');
      pfpIcon.className = 'fa-solid fa-circle-user';
      pfpDiv.appendChild(pfpIcon);
      itemDiv.appendChild(pfpDiv);

      // Create the content div
      const contentDiv = document.createElement('div');
      contentDiv.className = 'item-content';
      // contentDiv.style.display = 'flex'; // Already handled by CSS class
      // contentDiv.style.flexDirection = 'column'; // Already handled by CSS class

      const nameSpan = document.createElement('span');
      nameSpan.className = 'item-name';
      nameSpan.textContent = item.name;
      contentDiv.appendChild(nameSpan);

      const ageSpan = document.createElement('span');
      ageSpan.className = 'age';
      ageSpan.textContent = `Idade: ${item.age}`; // Display age
      contentDiv.appendChild(ageSpan);
      itemDiv.appendChild(contentDiv);

      // Create the buttons div
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'buttons';
      const planButton = document.createElement('button');
      planButton.className = 'ver-plano';
      planButton.textContent = 'Ver Plano';
      planButton.onclick= () => navigateTo('./plano.html');
      const fileButton = document.createElement('button');
      fileButton.className = 'ver-plano';
      fileButton.textContent = 'Ver Registro';
      fileButton.onclick= () => navigateTo('./registro.html');
      
      const buttonIcon = document.createElement('i');
      buttonIcon.className = 'fa-solid fa-arrow-right button-arrow';
      const buttonIcon2 = document.createElement('i');
      buttonIcon2.className = 'fa-solid fa-arrow-right button-arrow';
      
      buttonsDiv.appendChild(fileButton);
      buttonsDiv.appendChild(planButton);
      planButton.appendChild(buttonIcon);
      fileButton.appendChild(buttonIcon2);
      itemDiv.appendChild(buttonsDiv);

      // Append the complete item div to the main container
      container.appendChild(itemDiv);
  });
}

/**
 * Filtra pacientes pelo nome e redesenha a lista.
 *
 * Entrada:
 * - list: container DOM onde o resultado sera renderizado.
 * - items: array completo de pacientes.
 * - searchTerm: texto digitado para busca.
 *
 * Variaveis usadas:
 * - filteredItems: pacientes cujo nome contem o termo buscado.
 *
 * Saida:
 * - renderList chamado com os itens filtrados.
 */
function search(list, items, searchTerm){
  console.log(searchTerm)
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
    );
    renderList(list, filteredItems); // Re-render with filtered items
};

// Carregar dados do histórico
/**
 * Carrega o historico de registros de humor e exibe na pagina.
 *
 * Entrada:
 * - nao recebe parametros; busca #historyContainer no DOM.
 *
 * Variaveis usadas:
 * - moodRecords: registros salvos no localStorage.
 * - historyHTML: HTML acumulado para renderizacao.
 *
 * Saida:
 * - container preenchido com historico ou mensagem de lista vazia.
 */
function loadHistoryData() {
  const historyContainer = document.getElementById("historyContainer");
  if (!historyContainer) return;

  const moodRecords = JSON.parse(localStorage.getItem("moodRecords")) || [];

  if (moodRecords.length === 0) {
    historyContainer.innerHTML =
      "<p>Nenhum registro encontrado. Comece registrando seu humor!</p>";
    return;
  }

  let historyHTML = "";
  moodRecords.forEach((record, index) => {
    const date = new Date(record.timestamp).toLocaleDateString("pt-BR");
    historyHTML += `
            <div class="history-item">
                <div class="history-date">${date}</div>
                <div class="history-content">
                    ${
                      record.positiveEmotions
                        ? `<p><strong>Emoções Positivas:</strong> ${record.positiveEmotions}</p>`
                        : ""
                    }
                    ${
                      record.negativeEmotions
                        ? `<p><strong>Emoções Negativas:</strong> ${record.negativeEmotions}</p>`
                        : ""
                    }
                    ${
                      record.situation
                        ? `<p><strong>Situação:</strong> ${record.situation}</p>`
                        : ""
                    }
                    ${
                      record.thoughts
                        ? `<p><strong>Pensamentos:</strong> ${record.thoughts}</p>`
                        : ""
                    }
                    ${
                      record.reaction
                        ? `<p><strong>Reação:</strong> ${record.reaction}</p>`
                        : ""
                    }
                </div>
            </div>
        `;
  });

  historyContainer.innerHTML = historyHTML;
}

// Funções de emergência
/**
 * Abre o site do CVV apos confirmacao do usuario.
 *
 * Entrada:
 * - nao recebe parametros.
 *
 * Variaveis usadas:
 * - confirm: pergunta se o usuario quer continuar.
 *
 * Saida:
 * - nova aba com o site do CVV quando confirmado.
 */
function callEmergency() {
  if (
    confirm(
      "Você será redirecionado para o CVV (Centro de Valorização da Vida). Deseja continuar?"
    )
  ) {
    window.open("https://www.cvv.org.br/", "_blank");
  }
}

/**
 * Busca ajuda profissional proxima usando geolocalizacao.
 *
 * Entrada:
 * - nao recebe parametros; usa navigator.geolocation.
 *
 * Variaveis usadas:
 * - lat/lng: coordenadas retornadas pelo navegador.
 * - url: busca do Google Maps montada com as coordenadas.
 *
 * Saida:
 * - nova aba com busca no Maps ou alerta quando nao for possivel localizar.
 */
function findNearbyHelp() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const url = `https://www.google.com/maps/search/psicólogo+próximo/@${lat},${lng},15z`;
        window.open(url, "_blank");
      },
      function () {
        alert(
          'Não foi possível obter sua localização. Tente buscar manualmente por "psicólogo próximo" no Google Maps.'
        );
      }
    );
  } else {
    alert(
      'Geolocalização não é suportada neste navegador. Tente buscar manualmente por "psicólogo próximo" no Google Maps.'
    );
  }
}

// Adicionar estilos para animações
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .history-item {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: var(--shadow);
        border-left: 4px solid var(--primary-color);
    }
    
    .history-date {
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .history-content p {
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }
    
    .history-content strong {
        color: var(--dark-color);
    }
`;
document.head.appendChild(style);
