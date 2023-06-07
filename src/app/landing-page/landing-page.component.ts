import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import { RouterModule } from '@angular/router';
import { Cart, Products } from '../interfaces';
import { Observable } from 'rxjs';
import { CartService } from '../Services/Cart/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from '../State/appState';
import { getProducts } from '../State/Actions/productAction';
import { getProduct } from '../State/Reducers/productReducer';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  // imports:[RouterModule],
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  products!:Observable<Products[]>
  cart!:Observable<Cart[]>

  constructor(private cartService:CartService,private store:Store<AppState>){
  }
  ngOnInit(): void {
    this.products = this.store.select(getProduct)
    this.store.dispatch(getProducts())
  }

  

 


}
