const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const { MY_EMAIL, MY_EMAIL_APP_PASSWORD, SEND_EMAIL_TO, SUBJECT_LINE, EMAIL_BODY } = process.env;

const sendEmail = async (jsonData, errorData) => {
	// message content and subject line
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: `${MY_EMAIL}`,
			pass: `${MY_EMAIL_APP_PASSWORD}`,
		},
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: `${MY_EMAIL}`,
		to: SEND_EMAIL_TO,
		subject: `${SUBJECT_LINE}`,
		text: EMAIL_BODY,
		html: `<h2>DISCORD BOT FAILED</h2>
           <br>
           <p>jsonData: ${jsonData}</p>
           <br>
           <p>errorData: ${errorData}</p>`,
	};

	// send mail with defined transport object
	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${info.response}`);
	} catch (error) {
		console.log(error, 'sending mail');
	}
};

module.exports = sendEmail;
