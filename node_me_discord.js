// Load environment variables from .env file
const dotenv = require('dotenv').config();

// Get the required variables from the environment
const {
	THE_CHANNEL,
	MY_AUTHORIZATION_TOKEN,
	MESSAGE_SENT_TO_DISCORD_CHANNEL,
	COOKIE_FROM_HTTP_POST,
	MILISECONDS_IN_ONE_HOUR,
	HOW_MANY_HOURS_TO_SEND,
	MILISECONDS_IN_ONE_SECOND
} = process.env;

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

console.log("HIT");

// Function to format date
function formatDate() {
	let date = new Date();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const milliseconds = date.getMilliseconds().toString().padStart(2, '0');

	return `${month}/${day} @ ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Function to send a message to the Discord channel
function sendMessageToChannel(message) {
	const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
	const data = {
		content: message,
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
		.catch((error) => console.error('Error sending message:', error));
}

// Function to send the messages to the Discord channel
function sendMessages() {
	// Update stat_helper
	stat_helper.time_last_sent = stat_helper.time_now_sent;
	stat_helper.time_now_sent = formatDate();
	stat_helper.times_sent++;

	// Prepare the message
	let MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else =
		`${MESSAGE_SENT_TO_DISCORD_CHANNEL} last sent: ${stat_helper.time_last_sent}; times sent: ${stat_helper.times_sent}, and finally time now ${stat_helper.time_now_sent}`;

	// Send the message
	sendMessageToChannel(MESSAGE_SENT_TO_DISCORD_CHANNEL_plus_anything_else);
}

// Run the sendMessages function every X hours
const interval = MILISECONDS_IN_ONE_HOUR * HOW_MANY_HOURS_TO_SEND;
setInterval(sendMessages, interval);

// Send the first message immediately
sendMessages();

module.exports = sendMessages;
