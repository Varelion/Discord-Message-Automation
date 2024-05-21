// Load environment variables from .env file
const dotenv = require('dotenv').config();

// Get the required variables from the environment
const { THE_CHANNEL, MY_AUTHORIZATION_TOKEN, MESSAGE_SENT_TO_DISCORD_CHANNEL, COOKIE_FROM_HTTP_POST, MILISECONDS_IN_ONE_HOUR, HOW_MANY_HOURS_TO_SEND, MILISECONDS_IN_ONE_SECOND } = process.env; // {... env } deconstructs ALL variables in env

// Discord Channel ID where the messages will be sent
const channelId = THE_CHANNEL;

// Authorization token for the Discord API
const authorization = MY_AUTHORIZATION_TOKEN;


// Initialize Stat Helper
let stat_helper = {
	"times_sent": 1,
	"time_last_sent": 0,
	"time_now_sent": 0
};


// The messages to be sent to the Discord channel
const MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else = `${MESSAGE_SENT_TO_DISCORD_CHANNEL} last sent: ${stat_helper.time_last_sent}; times sent: ${stat_helper.times_sent}, and finally time now ${stat_helper.time_now_sent}`;



// Function to send a message to the Discord channel
function sendMessageToChannel(message) {
	const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
	const data = {
		content: MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else,
		cookie: COOKIE_FROM_HTTP_POST
	};

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: MY_AUTHORIZATION_TOKEN,
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => console.log('Message sent successfully:', data))
		.catch((error) => console.error('Error sending message:', error));
}

let FIRST_MESSAGE = true

// Function to send the messages to the Discord channel
function sendMessages() {
	// Send the first message immediately
	stat_helper.time_last_sent = stat_helper.time_last_sent;
	stat_helper.time_now_sent = new Date();
	stat_helper.time_last_sent++;
	sendMessageToChannel(MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else);

	FIRST_MESSAGE = false
	// Send the second message after a delay of 250 milliseconds, this is if you have a second
	// this is if you have a second, separate command to send. If it's just one message, just comment it out.
	setTimeout(() => sendMessageToChannel(MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else), 250);
}

// Run the sendMessages function every 8 hours (28800000 milliseconds)
// setInterval(sendMessages, 28800000);
FIRST_MESSAGE === true ? sendMessages() : null

setInterval(sendMessages, MILISECONDS_IN_ONE_HOUR * HOW_MANY_HOURS_TO_SEND);
