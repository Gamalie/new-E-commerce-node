import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../config";
import {v4 as uid} from 'uuid'
import jwt from 'jsonwebtoken'
interface decodedData{
    user_role:string
}
interface ExtendedRequest extends Request{
    body:{
        users: string
        status:string
    }
    info?:decodedData
    params:{
       order_id:string
       }
}
interface Orders{
    users: string
    status:string
}


export const makeOrder = async (req:Request,res:Response)=>{
    try{
    const pool =await mssql.connect(sqlConfig)
    const {users,order_id}=req.body 
    pool.request()
    .input('users',users) 
    .input('order_id',order_id)
    .execute('makeOrder ')
    return res.status(201).json({message:"You have made an order, Your goods will arrive in 3 days"})   
    }
    catch (error:any) { 
        return res.status(500).json(error.message)
    }
}

export const getAllOrders = async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        let order:Orders[]=(await pool.request().execute('getAllOrders')).recordset
        return res.status(200).json(order)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getOrderByUserId= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users}=req.body

        let order:Orders[]=(await pool.request()
        .input('users',users)
        .execute('getOrderById')).recordset

        if(!order){
            return res.status(404).json({message:"Order not Found"})
        }
        return res.status(200).json(order)
    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}

export const updateOrderStatus= async(req:ExtendedRequest ,res:Response)=>{
    try {
        const{status}=req.body
        const pool =  await mssql.connect(sqlConfig)

        // let order:Orders =(await  pool.request()
        // .input("order_id",order_id)
        // .execute('getOrderById')).recordset[0]
        
        // if(order){
        //     return res.status(404).json({message:"Order not found"})

        // }
        if(req.info?.user_role==='admin'){
        await pool.request()
        .input("status",status)
        .execute('updateOrderStaus')

        return res.status(201).json({message:"Updated status successfully"})
    }
        return res.status(201).json({message:"Not authorized"})  
        
    } catch (error:any) {
         return res.status(500).json(error.message) 
    }
}

export const deleteOrder= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {order_id}=req.body

        let order:Orders[]=(await pool.request()
        .input('order_id',order_id)
        .execute('cancelOrder')).recordset

        // if(!order){
        //     return res.status(404).json({message:"Order not found"})
        // }
        return res.status(200).json({message:"Order deleted"})
    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}





