// --------------------------
//#region The modular parts of the code
// --------------------------
// To get the the variables for 'theChannel', log into discord on chrome or firefox's browsers, and go to where you want your message to be sent.
// Then open up your developer console. Go to network. Send your message. Then, look into your developer console for 'message'.
// Under General Headers you'll see 'Request URL',  match the number missing from const url = `https://discord.com/api/v9/channels/${theChannel}/messages`;
// once you've entered the data into 'the channel, scroll down to 'REQUEST HEADERS', and 'authorization' will be what you put into the 'const myAuthorization' variable.
const nodemailer = require('nodemailer');
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

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR EMAIL HERE @gmail.com',
      pass: 'YOUR APP PASSWORD HERE',
    },
  });

  const myEmail = 'YOUR EMAIL HERE';
  const recipientEmails = ['TARGET@gmail.com', 'TARGET2@gmail.com'];
  let senderEmail = myEmail;
  // message content and subject line
  const subjectLine = `Gamble Bot: ${senderEmail}`;

  // setup email data with unicode symbols
  let mailOptions = {
    from: myEmail,
    to: recipientEmails.join(','),
    subject: subjectLine,
    text: message,
    html: `<h2>DISCORD BOT FAILED</h2>
          <br>
          <p>jsonData: ${dataData} </p>
                    <br>
          <p>errorData: ${errorData} </p>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, 'sending mail');
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

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
