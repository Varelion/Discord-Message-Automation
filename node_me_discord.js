// --------------------------
//#region The modular parts of the code
// --------------------------
// To get the the variables for 'theChannel', log into discord on chrome or firefox's browsers, and go to where you want your message to be sent.
// Then open up your developer console. Go to network. Send your message. Then, look into your developer console for 'message'. 
// Under General Headers you'll see 'Request URL',  match the number missing from const url = `https://discord.com/api/v9/channels/${theChannel}/messages`;
// once you've entered the data into 'the channel, scroll down to 'REQUEST HEADERS', and 'authorization' will be what you put into the 'const myAuthorization' variable.
const theChannel = '';
const myAuthorization = '';
//#endregion The modular parts of the code

export function sendMessageToChannel(message) {
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

let minutes = 0;
const func = () => {
  setInterval(function () {
    minutes++;
    console.log(`it has been ${minutes} minutes`);
    // the thing happens
    if (minutes >= 481) {
      console.log('minutes');

      setTimeout(() => sendMessageToChannel(first_Message), 534);

      setTimeout(() => sendMessageToChannel(second_Message), 0);
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
