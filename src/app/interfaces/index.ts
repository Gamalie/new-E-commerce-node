export interface decodedData{
    user_id:string
    user_name:string;
    user_email:string;
}

export interface Cart{
    count: number,
    Product_description: string,
    Product_image: string,
    Product_name: string,
    Product_price: number
    Product_id:string
}

export interface Orders{
    users: string
    status:string
}

export interface Products{

    Product_name:string
    Product_description:string
    Product_price:number
    Product_image:string
    Product_id:string
}

export interface newProducts{

    Product_name:string
    Product_description:string
    Product_price:number
    Product_image:string
}

export interface Newuser{
    user_name:string
    user_email:string
    user_password:string
 
}

export interface AddedUserSuccess{
    message:string
}

export interface AddedProductToCartSuccess{
    message:string
}

export interface IncProductInCartSuccess{
    message:string
}
export interface DecProductInCartSuccess{
    message:string
}
export interface DelProductInCartSuccess{
    message:string
}

export interface LogInuser{
    user_email:string
    user_password:string
 
}
export interface LoggedInUserSuccess{
    message:string,
    token:string,
    user_id:string
    role:string

}



