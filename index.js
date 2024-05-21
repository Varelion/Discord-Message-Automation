const sendEmail = require('./FUNCTIONS/send_mail');
const sendMessages = require('./node_me_discord')
const dotenv = require('dotenv').config();
const { MILISECONDS_IN_ONE_HOUR, HOW_MANY_HOURS_TO_SEND } = process.env;



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
