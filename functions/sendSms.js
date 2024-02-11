// functions/sendSms.js

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: '+16596007371', // Replace with your Twilio phone number
      to: phoneNumber,
    })
    .then((message) => {
      res.status(200).send({ status: 'success', message: message.sid });
    })
    .catch((err) => {
      res.status(500).send({ status: 'error', message: err.message });
    });
});

module.exports = app;
