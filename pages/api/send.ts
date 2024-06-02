// pages/api/send-email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { to, subject, text, pdfData } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        // user: 'nikyaeld@gmail.com',
        // pass: 'qhhbhcrzphzxsxqj',
      },
    });

    const mailOptions = {
      from: 'nikyaeld@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
            filename: 'ticket.pdf',
            content: pdfData,
            encoding: 'base64'
        },
      ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.toString() });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }

};


export default sendEmail;
