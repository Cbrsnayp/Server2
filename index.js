
// Importando as dependências
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors=require('cors')

// Configuração do servidor
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Habilitando o CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rota para a página HTML do servidor
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Evento de conexão do cliente
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Evento de recebimento de mensagem do cliente
  socket.on('sendMessage', (message) => {
    console.log('Mensagem recebida: ' + message);
    // Envia a mensagem recebida para todos os clientes conectados
    io.emit('receiveMessage', message);
  });

  // Evento de desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor Socket.IO iniciado na porta 3000');
});

