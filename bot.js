const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'cherishgames', //TODO Make another account
    password: 'oauth:12idegw5ej3gfms8vpt3ohs19pwexl'
  },
  channels: [
    'cherishgames'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const command = msg.trim().split(' ');

  // If the command is known, let's execute it
  if (command[0].substring(0,1) === '!') {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`* @${context.username} executed ${command[0]} command at ` + time + ' ' + date);
    if (command[0] === '!guess') {
      if (command.length > 1) {
        const num = parseInt(command[1], 10);
        if (num > 0) {
          client.say(target, `@${context.username} guessed ${num}`);
        } else {
          client.say(target, `@${context.username}, your number must be greater than 0`);
        }
      } else {
        client.say(target, `@${context.username}, enter a number to claim your spot`);
      }

    } else {
      //Unknown command
    }
  }
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
