import fs from 'fs'
import nodemailer from "nodemailer"
import handlebars  from 'handlebars'
import './loadEnv.js'

const EMAIL_ADDRESS = process.env.GMAIL_ADDRESS
const EMAIL_PASSWORD = process.env.GMAIL_PASSWORD

export async function sendEmail(username, habits, weather, email, subject, message) {
  const source = fs.readFileSync('./daily.html', 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: username, 
    habitList: habits.join("</li><li>"), 
    weather: weather, 
    message: message 
  };
  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD
        }
  });
  const mailOptions = {
        from: 'Habit Tracker',
        to: email,
        subject: subject,
        html: htmlToSend 
  };

  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
  });
}