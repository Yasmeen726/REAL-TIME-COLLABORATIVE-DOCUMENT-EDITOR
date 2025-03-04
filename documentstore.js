// server/documentStore.js
const documents = {};

function getDocument(documentId) {
  return documents[documentId];
}

function setDocument(documentId, document) {
  documents[documentId] = document;
}

module.exports = { getDocument, setDocument };