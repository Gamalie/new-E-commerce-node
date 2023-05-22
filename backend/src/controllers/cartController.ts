import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../config";
import {v4 as uid} from 'uuid'
import jwt from 'jsonwebtoken'


interface decodedData{
    user_id:string
    user_name:string;
    user_email:string;
}
interface ExtendedRequest extends Request{
    body:{
        Product_id: string
        users_id:string
    }
    info?:decodedData
    params:{
       users_id:string
       }
}
interface Cart{
    Product_id: string
    users:string
}


export const addToCart = async (req:Request,res:Response)=>{
    try{
    const pool =await mssql.connect(sqlConfig)
    const {Product_id,users}=req.body 
    pool.request()
    .input('Product_id',Product_id) 
    .input('users',users) 
    .execute('insertToCart')
    console.log(users);
    
    return res.status(201).json({message:"Product Added Successfully to Cart"})   
    }
    catch (error:any) { 
        return res.status(500).json(error.message)
    }
}

export const getAllInCart = async(req:Request<{users:string}>,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users}=req.params

        let cart:Cart[]=(await pool.request()
        .input('users',users).
        execute('getAllItemsInCart')).recordset

        if(!cart){
            return res.status(404).json({message:"No items in Cart"})
        }
        return res.status(200).json(cart)

    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}

export const getSingleItemInCart= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users,Product_id}=req.body

        let cart:Cart[]=(await pool.request()
        .input('users',users)
        .input('Product_id',Product_id)
        .execute('getSingleItemInCart')).recordset

        if(!cart){
            return res.status(404).json({message:"Product Not Found"})
        }
        return res.status(200).json(cart)

    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}

export const deleteFromCart= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users,Product_id}=req.body
        console.log(users)
        console.log(Product_id)
        
        let cart:Cart[]=(await pool.request()
        .input('users',users)
        .input('Product_id',Product_id)
        .execute('deleteFromCart')).recordset

        if(cart){
            return res.status(404).json({message:"Product Not Found"})
        }
        return res.status(200).json({message:"Product Deleted From Cart"})

    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}

export const increaseItemInCart= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users,Product_id}=req.body

        let cart:Cart[]=(await pool.request()
        .input('users',users)
        .input('Product_id',Product_id)
        .execute('increaseItemInCart')).recordset

        if(cart){
            return res.status(404).json({message:"Item Not found"})
        }
        return res.status(200).json({message:"Increased an Item in Cart"})

    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}

export const decreaseItemInCart= async(req:Request,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {users,Product_id}=req.body

        let cart:Cart[]=(await pool.request()
        .input('users',users)
        .input('Product_id',Product_id)
        .execute('decreaseItemInCart')).recordset

        if(cart){
            return res.status(404).json({message:"Item Not found"})
        }
        return res.status(200).json({message:"Reduced an Item in Cart"})

    } 
    catch (error:any) {
        
        return res.status(500).json(error.message)
    }
}