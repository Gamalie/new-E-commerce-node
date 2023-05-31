import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { OrdersService } from 'src/app/Services/Orders/orders.service';
import {Cart} from '../../interfaces'

interface Products{
  Product_id: number
  Product_name:string
  Product_description:string
  Product_price:number
  Product_image:string
  User_id:string
  Order_id:string

}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
products!:Products[]
cart!:Cart[]

  constructor(public cartService:CartService , public orderService:OrdersService){

  }

  getCartItems(){
    this.cartService.getAllProducts().subscribe(cartItems=>{
      this.cart=cartItems
    })
  }
 
  incItemInCart(id:string){
    this.cartService.increaseItemInCart(id)
  }
  decItemInCart(id:string){
    this.cartService.decreaseItemInCart(id)
  }
  deleteFromCart(id:string){
    this.cartService.deleteFromCart(id)
  }

  getOrders(orderId: string){
   
  this.orderService.getOrderById(orderId)
  

  }
}
