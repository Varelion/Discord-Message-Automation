// THIS ALTERNATE SCRIPT IS MEANT TO BE AUTOMATED WITH `crontab -e`; if you want one to be used with node, refer to the other '[...]discord.js' file.

const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'crontab.log' })],
});
logger.info('Crontab task started');
// --------------------------
//#region The modular parts of the code
// --------------------------
const theChannel = '';
const myAuthorization =
  '';
//#endregion The modular parts of the code

function sendMessageToChannel(message) {
  const url = `https://discord.com/api/v9/channels/${theChannel}/messages`;
  const data = {
    content: message,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: myAuthorization,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

// --------------------------
//#region The commands you will be sending to the server
// --------------------------
const first_Message = '';
const second_Message = '';
//#endregion The commands you will be sending to the server

console.log('Hello from crontab task at Discord.js !');

setTimeout(() => sendMessageToChannel(first_Message), 1);

setTimeout(() => sendMessageToChannel(second_Message), 523);

logger.info('Crontab task completed');
