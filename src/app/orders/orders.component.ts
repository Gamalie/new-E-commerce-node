import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../Services/Orders/orders.service';
import { CartService } from '../Services/Cart/cart.service';
import {Cart} from '../interfaces'

// export interface Products{
//   Product_id: number
//   Product_name:string
//   Product_description:string
//   Product_price:number
//   Product_image:string
//   Category:string
//   User_id:string
// }

// export interface Cart{
//   Product_id: number
//   Product_name:string
//   Product_description:string
//   Product_price:number
//   Count:number
//   Product_image:string
//   User_id:string,
//   Order_id:string
// }

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent{

  products!:Cart[]
  constructor(public orderService:OrdersService, public cartService:CartService){

  }

  placeOrder(){
    this.orderService.placeOrder()
  }

  // ngOnInit(orderId:string){
  //   this.orderService.getOrderById(orderId)
  // }

  getOrderByUser(userId:string){
    this.orderService.getUserOrder(userId)
  }

  cancelOrder(orderId:string){
    this.orderService.cancelOrders(orderId)

  }
  ngOnInit(): void {
    this.cartService.getAllProducts().subscribe(cartItems=>{
      this.products=cartItems
    })
  }


}