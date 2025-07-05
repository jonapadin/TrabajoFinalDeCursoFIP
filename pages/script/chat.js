const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');

    function addMessage(text, sender = 'user') {
      const msg = document.createElement('div');
      msg.classList.add('message', sender);
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (text !== '') {
        addMessage(text, 'user');
        messageInput.value = '';

        // Simulación de respuesta automática
        setTimeout(() => {
          addMessage('¡Gracias por tu mensaje! Un profesional responderá pronto.', 'bot');
        }, 800);
      }
    });