import type { NextApiRequest, NextApiResponse } from 'next';
import EmailTemplate from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        //   const {  } = req.body
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['uaelnikd@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'Yes, bitch! :)' }),
        });

        if (error) {
            return res.status(400).json(error);
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(':)', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};
