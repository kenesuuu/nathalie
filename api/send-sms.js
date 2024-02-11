import twilio from 'twilio';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    try {
      const result = await client.messages.create({
        body: message,
        from: '+16596007371',
        to: phoneNumber,
      });
      res.status(200).json({ status: 'success', message: result.sid });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
