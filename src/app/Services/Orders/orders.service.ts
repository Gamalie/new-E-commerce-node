import { Injectable } from '@angular/core';
import { Cart, Products } from 'src/app/interfaces';
import { CartService } from '../Cart/cart.service';

// export interface Products{
//   Product_id: number
//   Product_name:string
//   Product_description:string
//   Product_price:number
//   Product_image:string
//   Category:string
//   User_id:string
//   Order_id:string
// }

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
product!:Products
cart!:Cart[]

token=localStorage.getItem('token') as string
userId=localStorage.getItem('user_id')

constructor(private cartService:CartService){}

 getAllOrders(){
    this.cartService.deleteFromCart().subscribe(
      res=>{

      }
    )
    
  }

  cancelOrder(orderId:number){

  }

  // products:Products[]=[
  //   { 
  //     Product_id: 1,
  //     Product_name:'Mama Africa Lunch',
  //     Product_description:'Deliciously cooked',
  //     Product_price: 200,
  //     Product_image:'string',
  //     Category:'Food',
  //     User_id:'15',
  //     Order_id:'3'

  //   },

  //   {  
      
  //     Product_id: 2,
  //     Product_name:'Kids Colorful shoes',
  //     Product_description:'all sizes',
  //     Product_price: 1500,
  //     Product_image:'string',
  //     Category:'Kids',
  //     User_id:'15',
  //     Order_id:'3'
  //   },
  //   {  
  //     Product_id: 3,
  //     Product_name:'Chairs',
  //     Product_description:'strong and durable',
  //     Product_price: 120000,
  //     Product_image:'string',
  //     Category:'Furniture',
  //     User_id:'21',
  //     Order_id:'5',
  //   }
  //   ]

  // constructor() { }

  // getAllOrders(){
  //   this.products
  // }

  // placeOrder(){
  //     this.products.push(this.product)
  // }

  // getOrderById(orderId:string){
  //   let getOrder = this.products.find(item=>item.Order_id===orderId)
  //   return getOrder
  // }

  // getUserOrder(userId:string){
  //   let useOrder = this.products.find(item=>item.Order_id===userId)
  //   return useOrder

  // }
  // cancelOrders(orderId:string){
  //   let getOrder = this.products.find(item=>item.Order_id===orderId)
  //   if(getOrder){
  //   this.products.splice(this.products.indexOf(getOrder),1)}

  // }
}
