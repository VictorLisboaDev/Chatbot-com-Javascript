const messages = document.getElementById('messages');
const userInput = document.getElementById('userInput');

// Add event listeners
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  addMessage("Você: " + userText, 'user-message');
  showTypingIndicator();
  getBotResponse(userText.toLowerCase());
  userInput.value = "";
}

function addMessage(text, className = '') {
  const msgContainer = document.createElement('div');
  msgContainer.className = className;
  
  const msgText = document.createElement('div');
  msgText.textContent = text;
  msgContainer.appendChild(msgText);
  
  const timeStamp = document.createElement('div');
  timeStamp.className = 'message-time';
  timeStamp.textContent = getCurrentTime();
  msgContainer.appendChild(timeStamp);
  
  messages.appendChild(msgContainer);
  messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.textContent = 'Bot está digitando';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  return typing;
}

function removeTypingIndicator(typingElement) {
  if (typingElement && typingElement.parentNode) {
    typingElement.parentNode.removeChild(typingElement);
  }
}

function getBotResponse(input) {
  let response = "Desculpe, não entendi. Tente perguntar algo como 'oi', 'seu nome', 'hora', 'data', 'ajuda' ou 'tchau'.";
  const typingIndicator = document.querySelector('.typing-indicator');

  if (input.includes("oi") || input.includes("olá")) {
    response = "Olá! Como posso ajudar? Digite 'ajuda' para ver os comandos disponíveis.";
  } else if (input.includes("seu nome")) {
    response = "Eu sou uma IA simples criada com JavaScript! Estou aqui para ajudar.";
  } else if (input.includes("hora")) {
    response = "Agora são " + new Date().toLocaleTimeString('pt-BR');
  } else if (input.includes("data")) {
    response = "Hoje é " + new Date().toLocaleDateString('pt-BR');
  } else if (input.includes("ajuda")) {
    response = "Comandos disponíveis:\n- 'oi' ou 'olá': Saudação\n- 'seu nome': Informações sobre mim\n- 'hora': Mostra a hora atual\n- 'data': Mostra a data atual\n- 'tchau' ou 'adeus': Despedida";
  } else if (input.includes("tchau") || input.includes("adeus")) {
    response = "Até logo! Volte sempre que precisar.";
  }

  setTimeout(() => {
    removeTypingIndicator(typingIndicator);
    addMessage("Bot: " + response, 'bot-message');
  }, 1000);
}

// Add welcome message when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    addMessage("Bot: Olá! Eu sou seu assistente virtual. Como posso ajudar? Digite 'ajuda' para ver os comandos disponíveis.", 'bot-message');
  }, 500);
});

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
  .user-message {
    background-color: #e3f2fd;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    max-width: 80%;
    margin-left: auto;
  }
  
  .bot-message {
    background-color: #f5f5f5;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    max-width: 80%;
  }
  
  .typing-indicator {
    color: #666;
    font-style: italic;
    margin: 5px;
  }
  
  #messages {
    height: 400px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  #userInput {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1976d2;
  }
`;
document.head.appendChild(style);
