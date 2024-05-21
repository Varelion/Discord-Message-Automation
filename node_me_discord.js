// Load environment variables from .env file
const { log } = require('console');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();
const databasePath = path.join(__dirname, 'database.json');

// Get the required variables from the environment
const {
	THE_CHANNEL,
	MY_AUTHORIZATION_TOKEN,
	MESSAGE_SENT_TO_DISCORD_CHANNEL,
	COOKIE_FROM_HTTP_POST,
} = process.env;


// Discord Channel ID where the messages will be sent
const channelId = THE_CHANNEL;

// Authorization token for the Discord API
const authorization = MY_AUTHORIZATION_TOKEN;

// Initialize Stat Helper
let database;
try {
	const data = fs.readFileSync(databasePath, 'utf8');
	database = JSON.parse(data);
} catch (err) {
	console.error('Error reading or parsing database.json:', err);
	process.exit(1);
}

let stat_helper;
if (database.length > 0) {
	stat_helper = database[0].stat_helper || {
		times_sent: 0,
		time_last_sent: 0,
		time_now_sent: 0
	};
} else {
	console.error('database.json is empty or not properly formatted.');
	process.exit(1);
}




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




// Write to json
function writeDatabase(data) {
	try {
		fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
		// console.log('Updated database.json successfully.');
	} catch (err) {
		console.error('Error writing to database.json:', err);
	}
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
	console.log("sent")
	// Function to update stat_helper
	function updateStatHelper() {
		stat_helper.time_last_sent = stat_helper.time_now_sent;
		stat_helper.time_now_sent = formatDate();
		console.log(stat_helper.times_sent)
		stat_helper.times_sent++;
		console.log(stat_helper.times_sent)

		if (database.length > 0) {
			database[0] = stat_helper;
		} else {
			database.push({ stat_helper });
		}
		writeDatabase(database);
	}
	FIRST_TIME = false;
	// Update stat_helper
	updateStatHelper();

	// Prepare the message
	console.log(`${MESSAGE_SENT_TO_DISCORD_CHANNEL}\n
	Sent at: ${times_sent}\n
	Sent before at: ${stat_helper.time_last_sent}\n
	Times sent: ${stat_helper.times_sent}`)
	// Send the message
	sendMessageToChannel(MESSAGE_SENT_TO_DISCORD_CHANNEL);
}

// Send the first message immediately

module.exports = sendMessages;
