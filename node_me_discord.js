// --------------------------
//#region The modular parts of the code
// --------------------------
// To get the the variables for 'theChannel', log into discord on chrome or firefox's browsers, and go to where you want your message to be sent.
// Then open up your developer console. Go to network. Send your message. Then, look into your developer console for 'message'.
// Under General Headers you'll see 'Request URL',  match the number missing from const url = `https://discord.com/api/v9/channels/${theChannel}/messages`;
// once you've entered the data into 'the channel, scroll down to 'REQUEST HEADERS', and 'authorization' will be what you put into the 'const myAuthorization' variable.
const dotenv = require('dotenv').config();
const { THE_CHANNEL, MY_AUTHORIZATION_TOKEN } = process.env
let date;

function getDate() {
	date = new Date();
}



console.log(new Date())
const theChannel = 'channel ID HERE ';
const myAuthorization =
  'AUTHORIZATION HERE ';
let minutes = 499;
let timesRan = 0;
let timeExecuted = new Date('March 19 2023 ');
let dataData;
let errorData;
//#endregion The modular parts of the code

const consoleLogAndString = (json) => {
  console.log('Inside consoleLogAndString', json);
  switch (json) {
    case (json.content = '!job performance'):
      dataData = JSON.stringify(json);
      errorData = 'not this time';
      break;
    case (json.content = '!gamble 1000'):
      dataData = JSON.stringify(json);
      errorData = 'not this time';
      break;

    default:
      console.log('Hit switch case default');
      dataData = 'not this time';
      errorData = JSON.stringify(json);
      break;
  }
};

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
    .then((data) => consoleLogAndString(data))
    .catch((error) => consoleLogAndString(data));

  // sender and recipient email addresses




// --------------------------
//#region The commands you will be sending to the server
// --------------------------
const first_Message = '!job performance';
const second_Message = '!gamble 1000';
//#endregion The commands you will be sending to the server

const func = () => {
  setInterval(function () {
    minutes++;
    let nowOClock = new Date();
    console.log(
      ` \n\n Now is: ${nowOClock},
        \n Minutes: ${minutes},
        \n Times ran: ${timesRan},
        \n Last ran at: ${timeExecuted}\n`
    );
    // the thing happens
    if (minutes >= 481) {
      ++timesRan;
      timeExecuted = new Date();
      console.log(`\n***\nCode has executed ${timesRan} times\n***`);

      setTimeout(() => sendMessageToChannel(second_Message), 534);

      setTimeout(() => sendMessageToChannel(first_Message), 0);
      console.log(`\n***\nCode has executed ${timesRan} times\n***`);

      minutes = 0;
    }
  }, 60000);
};
func();
