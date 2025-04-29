const startBtn = document.getElementById('start-btn');
const sendBtn = document.getElementById('send-btn');
const textInput = document.getElementById('text-input');
const responseDiv = document.getElementById('response');

// Configurar reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES';

// Hablar (voz de respuesta)
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  speechSynthesis.speak(utterance);
}

// Función de respuesta inteligente
function getResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('usb') || msg.includes('no reconoce')) {
    return "Conecta el USB en otro puerto. Si no lo reconoce, revisa los drivers del dispositivo.";
  } else if (msg.includes('pantalla negra') || msg.includes('no enciende')) {
    return "Revisa las conexiones del monitor. Si todo está bien, podría ser problema de la tarjeta gráfica o energía.";
  } else if (msg.includes('internet') || msg.includes('no conecta')) {
    return "Reinicia el router y revisa que los cables estén conectados correctamente.";
  } else if (msg.includes('virus') || msg.includes('lento')) {
    return "Pasa un antivirus completo y elimina programas innecesarios que consumen recursos.";
  } else if (msg.includes('ip') || msg.includes('red')) {
    return "La IP es un número que identifica tu dispositivo en la red. Puedes verla escribiendo ipconfig en CMD.";
  } else if (msg.includes('word') || msg.includes('documento')) {
    return "En Word puedes crear documentos. Recuerda guardar frecuentemente para evitar pérdidas.";
  } else if (msg.includes('excel') || msg.includes('tabla')) {
    return "En Excel puedes crear tablas dinámicas para organizar datos rápidamente.";
  } else {
    return "Lo siento, no entendí bien. ¿Puedes repetir o darme más detalles?";
  }
}

// Función para procesar mensaje
function processMessage(message) {
  const reply = getResponse(message);
  responseDiv.textContent = reply;
  speak(reply);
}

// Cuando se presiona 'Hablar'
startBtn.addEventListener('click', () => {
  recognition.start();
});

// Cuando el reconocimiento termina
recognition.onresult = (event) => {
  const message = event.results[0][0].transcript;
  processMessage(message);
};

// Cuando se presiona 'Enviar'
sendBtn.addEventListener('click', () => {
  const message = textInput.value.trim();
  if (message !== "") {
    processMessage(message);
    textInput.value = "";
  }
});