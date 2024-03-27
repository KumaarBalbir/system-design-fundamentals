const axios = require("axios");
const WebSocket = require("ws");

function publish(message, topicId) {
  return axios.post(`ws://localhost:3000/${topicId}`, message);
}

function subscribe(topicId) {
  return new WebSocket(`ws://localhost:3000/${topicId}`);
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;
