//import { Request } from "express"
import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../config";
import {v4 as uid} from 'uuid'
// import jwt from 'jsonwebtoken'
// import { log } from "console";
interface decodedData{
    user_id:string
    user_name:string;
    user_email:string;
    user_role:string
}
interface ExtendedRequest extends Request{
    body:{
        Product_name:string
        Product_description:string
        Product_price:number
        Product_image:string
    }
    info?:decodedData
    params:{
        Product_id:string
       }
}
interface Products{
    Product_id: string
    Product_name:string
    Product_description:string
    Product_price:number
    Product_image:string
    isDelete:number
}

//(Product_id VARCHAR(100),Product_name VARCHAR(100),Product_description VARCHAR(1000),Product_price INT, Product_image VARCHAR(300),isDelete INT DEFAULT(0))
export const addProduct = async (req:ExtendedRequest,res:Response)=>{
    try{
    let Product_id = uid()
    const pool =await mssql.connect(sqlConfig)
    const {Product_name,Product_description,Product_price,Product_image}=req.body 
    if(req.info?.user_role==='admin'){
    pool.request()
    .input('Product_id',Product_id) 
    .input('Product_name',Product_name) 
    .input('Product_description',Product_description) 
    .input('Product_price',Product_price) 
    .input('Product_image',Product_image) 
    .execute('addProducts')
    return res.status(201).json({message:"Product Added Successfully"})
}
    return res.status(201).json({message:"Not authorized"})   
}
 catch (error:any) { 
    //server side error
    return res.status(500).json(error.message)
}
}

//GET ALL PRODUCT
export const getAllProducts = async(req:Request,res:Response)=>{
        try {
            const pool =await mssql.connect(sqlConfig)
            let products:Products[]=(await pool.request().execute('getAllProducts')).recordset
            return res.status(200).json(products)
        } catch (error:any) {
            return res.status(500).json(error.message)
        }
}

//GET ONE PRODUCT
export const getOneProduct =async (req:Request<{Product_id:string}>, res:Response)=>{
    try {
        const {Product_id}=req.params
        const pool =await mssql.connect(sqlConfig)
     

        let product:Products = (await pool.request()
        .input('Product_id',Product_id)
        .execute('getOneProduct')).recordset[0]

        if(!product){
            return res.status(404).json({message:"Property Not Found"})
        }

        return res.status(200).json(product)
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}

export const updateProduct = async (req:Request <{Product_id:string}>,res:Response)=>{
    try{
        const pool =  await mssql.connect(sqlConfig)
        const {Product_id}=req.params
       
        let product:Products[] = (await pool.request()
        .input('Product_id',Product_id)
        .execute('getOneProduct')).recordset
    
    if(!product.length){ //no user found
        return res.status(404).json({message:"Product Not Found"})
    }
    //continue with the update process
    const {Product_name,Product_description,Product_price,Product_image}=req.body 
    await pool.request()
    .input('Product_id',Product_id) 
    .input('Product_name',Product_name) 
    .input('Product_description',Product_description) 
    .input('Product_price',Product_price) 
    .input('Product_image',Product_image) 
    .execute('updateProducts')
    return res.status(200).json({message:"Products Updated"})
} catch (error:any) {
    //server side error
    return res.status(500).json(error.message) 
}
}

///delete Property 
export const deleteProduct = async (req:Request <{Product_id:string}> ,res:Response)=>{

    try {
        const pool =await mssql.connect(sqlConfig)
        const {Product_id}=req.params

        let product:Products[]= (await pool.request()
        .input('Product_id',Product_id)
        .execute('getOneProduct')).recordset

        if(!product.length){
            return res.status(404).json({message:"Product Not Found"})
        } 
        
        await pool.request().input("Product_id",Product_id).execute('deleteOneProduct')
        return res.status(200).json({message:"Product Deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}







