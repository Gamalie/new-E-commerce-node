import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../Services/Orders/orders.service';
import { CartService } from '../Services/Cart/cart.service';
import {Cart} from '../interfaces'
import { Observable } from 'rxjs';
import { getProductsFromCart } from '../State/Actions/cartAction';
import { getCart } from '../State/Reducers/cartReducer';
import { Store } from '@ngrx/store';

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
  cart!:Observable<Cart[]>
  constructor(private store:Store){

  }

  ngOnInit(): void {
    this.cart= this.store.select(getCart)
    this.store.dispatch(getProductsFromCart())
    }
  }



