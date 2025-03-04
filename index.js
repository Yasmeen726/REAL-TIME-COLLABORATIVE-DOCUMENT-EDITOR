const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ot = require('./ot');
const documentStore = require('./documentStore');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
    let document = documentStore.getDocument(documentId);
    if (!document) {
      document = { content: '', history: [] };
      documentStore.setDocument(documentId, document);
    }
    socket.emit('documentContent', document.content);
  });

  socket.on('textChange', (data) => {
    const { documentId, operation } = data;
    const document = documentStore.getDocument(documentId);

    if (document) {
      const transformedOperation = ot.apply(document.history, operation);
      document.content = ot.applyOperation(document.content, transformedOperation);
      document.history.push(transformedOperation);
      documentStore.setDocument(documentId, document);

      io.to(documentId).emit('textChange', { operation: transformedOperation });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));