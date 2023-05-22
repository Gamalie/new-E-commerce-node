import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
import { sqlConfig } from '../config'
import { sendEmail } from '../helper/sendMail'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

interface users{
    user_id:string
    user_name:string
    user_email:string
    user_isAdmin:string
    user_password:string
    is_deleted:number
   

    
}


export const sendWelcomeEmail= async ()=>{
    const pool= await mssql.connect(sqlConfig)

    const users:users[]= await (await pool.request().query('SELECT * FROM users WHERE email_sent=0')).recordset
    console.log(users);

    for (let user of users){
        //send email
        ejs.renderFile('Templates/welcome.ejs',{name:user.user_name},async(err,html)=>{
            

            // console.log(html);

            //send email
            try {
                let messageOptions={
                    from:process.env.EMAIL , // sender address
                    to: user.user_email, // list of receivers
                    subject: "Welcome email", // Subject line
                   
                    html
                }
                console.log(html);
                
                await sendEmail(messageOptions)
                //update database

                await pool.request().query(`UPDATE users SET email_sent=1 where user_id='${user.user_id}'`)
            } catch (error:any) {
                
            }

        })
       

    }
    


}

export const sendResetEmail= async ()=>{
    const pool= await mssql.connect(sqlConfig)

    const users:users[]= await (await pool.request().query(`SELECT * FROM users WHERE reset_password=1`)).recordset
    console.log(users);

    for (let user of users){
        //send email
        ejs.renderFile('Templates/resetEmail.ejs',{name:user.user_name},async(err,html)=>{
            

            // console.log(html);

            //send email
            try {
                let messageOptions={
                    from:process.env.EMAIL , // sender address
                    to: user.user_email, // list of receivers
                    subject: "Welcome email", // Subject line
                   
                    html
                }
                console.log(html);
                
                await sendEmail(messageOptions)
                //update database

                await pool.request().query(`UPDATE users SET reset_password=0 where user_id='${user.user_id}'`)
            } catch (error:any) {
                
            }

        })
       

    }


}

