// --------------------------
//#region The modular parts of the code
// --------------------------
// To get the the variables for 'theChannel', log into discord on chrome or firefox's browsers, and go to where you want your message to be sent.
// Then open up your developer console. Go to network. Send your message. Then, look into your developer console for 'message'.
// Under General Headers you'll see 'Request URL',  match the number missing from const url = `https://discord.com/api/v9/channels/${theChannel}/messages`;
// once you've entered the data into 'the channel, scroll down to 'REQUEST HEADERS', and 'authorization' will be what you put into the 'const myAuthorization' variable.
const nodemailer = require('nodemailer');
const theChannel = '907451784656736346';
const myAuthorization =
  'MzYzMjcxNDU0MjM1ODIwMDMz.GaOOH9.qdCTf5WroTLOyCsNRS3Xpy0TENYnZHhP4STnk0';
let minutes = 163;
let timesRan = 1;
let timeExecuted = new Date('March 19 2023 ');
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

  let jsonData = JSON.stringify(data);
  let errorData = 'None this time';
  if (error) {
    let errorData = JSON.stringify(error);
  }
  if (!jsonData.content) {
    // sender and recipient email addresses

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'business.8508@gmail.com',
        pass: 'nhotuuabnopufdyd',
      },
    });

    const myEmail = 'business.8508@gmail.com';
    const recipientEmails = ['ighormisc@gmail.com', 'business.8508@gmail.com'];
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
          <p>jsonData: ${jsonData} </p>
                    <br>
          <p>jsonData.content: ${jsonData.content} </p>
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
      `Minutes: ${minutes}, now is: ${nowOClock}
      \n Times ran: ${timesRan}
      \n Last ran at: ${timeExecuted}`
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
// const nextTime = () => {};

// let func = async () => {
//   while (true) {
//     const now = new Date();
//     const nowHour = now.getHours();
//     const nowMinute = now.getMinutes();

//     if (true) {
//       console.log('it is time!');
//       nextTime();
//       // return; // exit the loop when the target time is reached
//     }
//     console.log('not yet');
//     // Wait for 1 second before checking again
//     // to avoid excessive CPU usage
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
// };

// func();
