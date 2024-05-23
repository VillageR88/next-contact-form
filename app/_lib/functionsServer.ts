'use server';

import nodemailer from 'nodemailer';

export async function CreateInvoiceContactForm(prev: number, formData: FormData): Promise<number> {
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
  //const queryType = formData.get('queryType') as string;
  //const message = formData.get('message') as string;
  const htmlContent = `Hello ${name},<br/><br/>Thank you for contacting us. We will get back to you as soon as possible.<br/><br/> If you received this email by mistake, please ignore it.<br/><br/>Best regards,<br/><br/><a href="https://www.frontendmentor.io/profile/VillageR88">VillageR88</a><br/>`;
  if (!process.env.EMAIL) return prev;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Contact Form',
    html: htmlContent,
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
  return prev + 1;
}
