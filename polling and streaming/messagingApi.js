const axios = require("axios"); //to make http requests
const WebSocket = require("ws"); // to open a two way, realtime, event-driven connection b/w a client and a server without continuous polling.

function createMessagingSocket() {
  return new WebSocket("ws://localhost:8080/messages");
}

function getMessages() {
  return axios.get("http://localhost:8080/messages"); //http request to get messages
}

function sendMessage(message) {
  return axios.post("http://localhost:8080/messages", message); //http request to send messages
}

module.exports = {
  createMessagingSocket,
  getMessages,
  sendMessage,
};
