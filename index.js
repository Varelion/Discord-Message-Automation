const sendEmail = require('./FUNCTIONS/send_mail');
const sendMessages = require('./FUNCTIONS/node_me_discord')
const dotenv = require('dotenv').config();
const { MILISECONDS_IN_ONE_HOUR, HOW_MANY_HOURS_TO_SEND } = process.env;



let FIRST_TIME = true //WE are doing this after const, because we need to change FIRST_TIME;
console.log(FIRST_TIME)
FIRST_TIME == true ? sendMessages() : null;

FIRST_TIME = false;

// --------------------------
//#region Send Discord Message To Channel @ Time
// --------------------------
setInterval(sendMessages, MILISECONDS_IN_ONE_HOUR * HOW_MANY_HOURS_TO_SEND);

//#endregion Send Discord Message To Channel @ Time




// --------------------------
//#region Send Email
// --------------------------
// sendEmail('Your JSON data', 'Your error data');
//#endregion Send Email//
