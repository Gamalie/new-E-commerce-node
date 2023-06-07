import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Products } from '../interfaces';
import { CartService } from '../Services/Cart/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from '../State/appState';
import { getOneProduct, getProducts, updateProducts } from '../State/Actions/productAction';
import { getOneReProduct, getProduct} from '../State/Reducers/productReducer';
import { addProductsToCart } from '../State/Actions/cartAction';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products!:Observable<Products[]>
 
 
  constructor(public cartService:CartService, private store:Store<AppState>,) {
   
  }

 

  ngOnInit(): void {
    this.products = this.store.select(getProduct)
    this.store.dispatch(getProducts())
  }


  addtoCart(Product_id:string){
    this.store.dispatch(addProductsToCart({prodId:Product_id}))
    
    
  }


 


}
function getOneProperty(): any {
  throw new Error('Function not implemented.');
}

