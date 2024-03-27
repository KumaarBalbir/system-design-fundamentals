const helpers = require("./helpers");
const messagingApi = require("./messagingApi");

const readline = require("readline");

const displayedMessages = {};

const terminal = readline.createInterface({
  input: process.stdin,
});

terminal.on("line", (text) => {
  const username = process.env.NAME;
  const id = helpers.getRandomInt(1000);
  displayedMessages[id] = true;

  const message = { id: id, text: text, username: username };
  messagingApi.sendMessage(message);
});

function displayMessage(message) {
  console.log(`${message.username} says: ${message.text}`);
  displayedMessages[message.id] = true;
}

async function getAndDisplayMessages() {
  const messages = await messagingApi.getMessages();
  // console.log("Messages: ", messages.data);
  //axios returns original response in .data property
  for (const message of messages.data) {
    if (!(message.id in displayedMessages)) {
      displayMessage(message);
    }
  }
}

function pollMessages() {
  setInterval(getAndDisplayMessages, 3000);
}

function streamMessage() {
  const messagingSocket = messagingApi.createMessagingSocket();

  messagingSocket.on("message", (data) => {
    const message = JSON.parse(data);
    if (!(message.id in displayedMessages)) {
      displayMessage(message);
    }
  });
}

if (process.env.MODE === "poll") {
  getAndDisplayMessages();
  pollMessages();
} else if (process.env.MODE === "stream") {
  getAndDisplayMessages();
  streamMessage();
}
