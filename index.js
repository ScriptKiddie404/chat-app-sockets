const express = require('express');
const app = express();
const http = require('http').createServer(app);
port = process.env.PORT || 3000;
// Socket:
const io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Evento connection = Cuando alguien se conecta.
io.on('connection', socket => {
    console.log('¡Usuario conectado!');
    // Evento en desconexión:
    socket.on('disconnect', () => {
        console.log('¡Usario desonectado!');
    });
    // Creamos el evento para escuchar el mensaje del chat
    // 'chat message' es el mismo nombre que había en SocketsSetup
    socket.on('chat message', ({ mensaje, username }) => {
        console.log(`Usuario: ${username}, mensaje: ${mensaje}`);
        // Para mandar a todos los sockets un mensaje:
        io.emit('chat message', { mensaje, username });
    });
});

http.listen(port, () => {
    console.log("Escuchando en el puerto 3000");
});