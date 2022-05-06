import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8ae0396b63c1ce",
        pass: "c143520927b8b8"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData){

   await transport.sendMail({
        from: "Equipe Feedget<oi@feedback.com>",
        to: 'Evelyn Helena<evelyn.helena1@gmail.com>',
        subject,
        html: body
    }); 
    };
}