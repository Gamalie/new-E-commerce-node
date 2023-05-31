import { Injectable } from '@angular/core';

export interface Products{
  Product_id: number
  Product_name:string
  Product_description:string
  Product_price:number
  Product_image:string
 Category:string
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:Products[]=[
    {  Product_id: 1,
      Product_name:'Mama Africa Lunch',
      Product_description:'Deliciously cooked',
      Product_price: 200,
      Product_image:'string',
      Category:'Food'
    },

    {  Product_id: 2,
      Product_name:'Kids Colorful shoes',
      Product_description:'all sizes',
      Product_price: 1500,
      Product_image:'string',
      Category:'Kids'
    },
    {  Product_id: 3,
      Product_name:'Chairs',
      Product_description:'strong and durable',
      Product_price: 120000,
      Product_image:'string',
      Category:'Furniture'
    },
    {  Product_id: 4,
      Product_name:'Chairs',
      Product_description:'strong and durable',
      Product_price: 120000,
      Product_image:'string',
      Category:'Furniture'
    },
    {  Product_id: 5,
      Product_name:'Chairs',
      Product_description:'strong and durable',
      Product_price: 120000,
      Product_image:'string',
      Category:'Furniture'
    }
    
    ]

  constructor() { }

  getoneCategory(category:string){
    let pos= this.products.find(product=>product.Category===category)
    
  }

  getAllProducts():Products[]{
    return this.products
  }

  addProduct(newProduct:Products){
    this. products.push(newProduct)
  }


}
