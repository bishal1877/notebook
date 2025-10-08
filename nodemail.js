import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export  const transporter = nodemailer.createTransport({
  host: process.env.SMTPS,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth:{
user:process.env.Login,
pass:process.env.Pass,
  }
});
