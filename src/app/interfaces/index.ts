export interface decodedData{
    user_id:string
    user_name:string;
    user_email:string;
}
// interface ExtendedRequest extends Request{
//     body:{
//         Product_id: string
//         users_id:string
//     }
//     info?:decodedData
//     params:{
//        users_id:string
//        }
// }
export interface Cart{
    Product_id: string
    users:string
    count:number
}

export interface Orders{
    users: string
    status:string
}

export interface Products{
    Product_id: string
    Product_name:string
    Product_description:string
    Product_price:number
    Product_image:string
    isDelete:number
}

export interface Newuser{
    // user_id:string
    user_name:string
    user_email:string
    user_password:string
    // is_deleted:number   
}

export interface AddedUserSuccess{
    message:string
}


