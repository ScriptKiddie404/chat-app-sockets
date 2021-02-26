var socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const username = prompt("Ingresa nickname: ");

form.addEventListener('submit', e => {

    e.preventDefault();

    if (input.value) {
        // Emitimos el mensaje al socket
        const mensaje = input.value;
        socket.emit('chat message', {
            mensaje,
            username
        });
        input.value = '';
    }

});

// Recibimos en caso de que haya un mensaje:
socket.on('chat message', ({ mensaje, username }) => {
    const item = document.createElement('li');
    item.textContent = `${username} dice: ${mensaje}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});