'use server';

import nodemailer from 'nodemailer';

export async function CreateInvoiceContactForm(prev: '', formData: FormData): Promise<''> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const name = `${firstName} ${lastName}`;
  const message = formData.get('message') as string;
  if (!process.env.EMAIL) return '';
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('there was an error: ', err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
  return '';
}
