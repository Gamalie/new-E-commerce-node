import { Injectable } from '@angular/core';
import {AddedProductToCartSuccess, Cart, DecProductInCartSuccess, DelProductInCartSuccess, IncProductInCartSuccess, Products} from '../../interfaces'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
 prodId!:string
  cart:Cart[]=[]

  
    token=localStorage.getItem('token') as string
    userId=localStorage.getItem('user_id')
  constructor(private http:HttpClient) { }

 

  getAllProducts():Observable<Cart[]>{
    return this.http.get<Cart[]>(`http://localhost:4000/Cart/${this.userId}`)
  }

  addtoCart(prodId:string):Observable<AddedProductToCartSuccess>{
  
      
    return this.http.post<AddedProductToCartSuccess>(`http://localhost:4000/Cart`,{
      users:this.userId,
      Product_id:prodId
      
    },{headers: new HttpHeaders().set('token',this.token)})
  }

  increaseItemInCart(id:string):Observable<IncProductInCartSuccess>{
    return this.http.put<IncProductInCartSuccess>(`http://localhost:4000/Cart/${id}/${this.userId}`,{
      users:this.userId,
      Product_id:id
      
    },{headers: new HttpHeaders().set('token',this.token)})
    }


    decreaseItemInCart(id:string):Observable<DecProductInCartSuccess>{
      return this.http.put<DecProductInCartSuccess>(`http://localhost:4000/Cart/dec/${id}/${this.userId}`,{
        users:this.userId,
        Product_id:id
        
      },{headers: new HttpHeaders().set('token',this.token)})
      }

      deleteFromCart():Observable<DecProductInCartSuccess>{
        return this.http.delete<DelProductInCartSuccess>(`http://localhost:4000/Cart/${this.userId}`,{headers: new HttpHeaders().set('token',this.token)})
        }

      deleteItemInCart(id:string):Observable<DecProductInCartSuccess>{
        return this.http.delete<DelProductInCartSuccess>(`http://localhost:4000/Cart/${id}/${this.userId}`,{headers: new HttpHeaders().set('token',this.token)})
        }
  

  // decreaseItemInCart(id:string){
    // let decItem = this.cart.find(product=>{return product.Product_id===id})
    // if(decItem){
    //   if (decItem.count>1){
    //   decItem.count = decItem.count-1
    // }
    // else
    // {
    //   this.cart.splice(this.cart.indexOf(decItem),1)
    // }
  // }
  // }

  // deleteFromCart(id:string){
  //   let deleteItem = this.cart.find(product=>{return product.Product_id===id})
  //   if(deleteItem){
  //     this.cart.splice(this.cart.indexOf(deleteItem),1)
  //   }
  }


