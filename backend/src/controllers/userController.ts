import { Request, RequestHandler, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {registrationSchema} from '../helpers/userValidation'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

interface users{
    user_id:string
    user_name:string
    user_email:string
    user_password:string
    is_deleted:number

    
}

interface ExtendedRequest extends Request{
    body:{
        user_id:string
        user_name:string
        user_email:string
        user_password:string
    }
    params: {
        user_email:string
        user_id:string
    }
}

export const addUser= async (req:ExtendedRequest,res:Response)=>{
    //command for registering users to the database
    try {
        let user_id=uid()  //for generating unique id
        const{user_name, user_email,user_password}=req.body   //for getting data from req.body

        //validation
        const {error}=registrationSchema.validate(req.body)
        if(error){
           return res.status(404).json(error.details[0].message)
        }

        let hashedPassword= await bcrypt.hash(user_password,10)
        
        //connect to the database
        const pool= await mssql.connect(sqlConfig)

        //make a request
        await pool.request()
        .input("user_id",user_id)
        .input("user_name",user_name)
        .input("user_email",user_email)
        .input("user_password",hashedPassword)
        
        
        
        .execute("register_user")

        return res.status(201).json({message:"User registered successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
        

        
    }
}


export const getAllUser:RequestHandler= async (req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        let user:users[] = await( await pool.request().execute('getAllUser')).recordset
        res.status(200).json(user)
        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}


export const getUserByEmail=async(req:Request<{user_email:string}>,res:Response)=>{
    try {
        const {user_email}=req.params
        const pool =  await mssql.connect(sqlConfig)

        let user:users = (await(await  pool.request())
        .input('user_email', user_email)
        .execute('getOneUser')).recordset[0]

        if(user){
             return res.status(200).json(user) 
        }
        return res.status(404).json({message:"User Not Found"})

      

    } catch (error:any) {
         return res.status(500).json(error.message)
    }
}

//updating user

export const updateUser= async(req:Request,res:Response)=>{
    try {
        const{user_name, user_email,user_password}=req.body   
        console.log(req.body);
        const{user_id}=req.params

        const pool =  await mssql.connect(sqlConfig)

        let user:users =(await  pool.request()
        .input("user_email",user_email)
       
        .execute('getOneUser')).recordset[0]
        
        if(!user){
            return res.status(404).json({message:"User Not Found"})

        }

        await pool.request()
        .input("user_id",user_id)
        .input("user_name",user_name)
        .input("user_email",user_email)
        .input("user_password",user_password)
        .execute('updateUsers')

        return res.status(201).json({message:"User updated successfully"})


        
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
        
    }
}


export const deleteUser=async (req:Request<{user_id:string}>,res:Response)=>{

    try {
        const{user_id}=req.params
        // console.log({user_email})

        const pool =  await mssql.connect(sqlConfig)

        let user:users []=(await  pool.request()
        .input('user_id', user_id)
        .execute('delete_user')).recordset
 

        return res.status(200).json({message:"User deleted successfully"})


        if(!user.length){
            return res.status(404).json({message:"User Not Found"})

        }
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
        
    }

}

export const loginUser=async (req:Request,res:Response)=>{
    try {

        const pool=await mssql.connect(sqlConfig)
        const{user_email,user_password}=req.body as{user_email:string,user_password:string}

        let user:users[] =await (await  pool.request()
        .input("user_email",user_email)
        .execute('getOneUser')).recordset


        if(!user[0]){
            return res.status(404).json({message:"User not found"})

        }

        let validPassword = await bcrypt.compare(user_password,user[0].user_password)
        if(!validPassword){
            return res.status(404).json({message:"Wrong password"})


        }
        const payload=user.map(lUser=>{
            const{user_password,is_deleted,...rest}=lUser
            return rest

        })
        //token generation
        const token=jwt.sign(payload[0],process.env.SECRET_KEY as string, {expiresIn:'72000s'})
        
        
        return res.json({message:"You have logged in successfully",token})
        
        
    } catch (error:any) {
         return res.status(500).json(error.message)
        
    }
}



export const resetPassword=async (req:Request,res:Response)=>{
 try {

  const{ user_email,user_password}=req.body 
  const pool = await mssql.connect(sqlConfig)

  let user:users =(await pool.request()
  .input("user_email",user_email)
  .execute('getOneUser')).recordset[0]
  console.log(user);

  let hashedPassword= await bcrypt.hash(user_password,10)
  if(!user){

   return res.status(404).json({message:"User Not Found"})
  }

  await pool.request()

  .input("user_email",user_email)

  .input("user_password",hashedPassword)

  .execute('resetPassword')


  return res.status(201).json({message:"User updated successfully"})

 } catch (error:any) {

  return res.status(500).json(error.message)

 }

}
