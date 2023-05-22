import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

let configOptions={
    host: "smtp.gmail.com",
    service:"gmail",
    port: 486,
    secure: false, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, 
}
,
    tls:{
        rejectUnauthorized:false
    }
}

function createTransporter(configOpn:any){
    return nodemailer.createTransport(configOpn)
}

export async function sendEmail(messageOptions:any){
    let transporter=createTransporter(configOptions)

    await transporter.sendMail(messageOptions,(err,response)=>{
        console.log(response);

    })

}