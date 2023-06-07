import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/app/Services/Cart/cart.service';
import { OrdersService } from 'src/app/Services/Orders/orders.service';
import {Cart, Products} from '../../interfaces'
import { Store } from '@ngrx/store';
import { getCart } from 'src/app/State/Reducers/cartReducer';
import { deleteProductsToCart, getProductsFromCart } from 'src/app/State/Actions/cartAction';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/State/appState';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
products!:Products[]
cart!:Observable<Cart[]>

  constructor(public cartService:CartService , public orderService:OrdersService,private router:Router,private store:Store<AppState>){

  }
  // public 
  ngOnInit(){
    this.cart= this.store.select(getCart)
    this.store.dispatch(getProductsFromCart())
  }
  deleteFromCart(id:string){
    this.store.dispatch(deleteProductsToCart({prodId:id}))
  }

  incItemInCart(id:string){
    this.cartService.increaseItemInCart(id).subscribe(res=>{console.log(res)
      
      console.log(id)
  })

  }
  orders(){
    this.router.navigate(['/order'])
  }

  decItemInCart(id:string){
    this.cartService.decreaseItemInCart(id).subscribe(res=>{console.log(res)
      // console.log(id)
  })

  }
  delFromCart(){
    this.cartService.deleteFromCart().subscribe(res=>{console.log(res)})
    this.router.navigate(['/order'])
  }
  delItemInCart(id:string){
    this.cartService.decreaseItemInCart(id).subscribe(res=>{console.log(res)
      // console.log(id)
  })

  }

}

