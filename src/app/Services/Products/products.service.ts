import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddedProductToCartSuccess, Products, newProducts } from 'src/app/interfaces';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  token=localStorage.getItem('token') as string
  userId=localStorage.getItem('user_id')
  constructor(private http:HttpClient) {

   }
   
  getAllProducts():Observable<Products[]>{
    return this.http.get<Products[]>('http://localhost:4000/Products')
  }

  getProductById(Product_id:string):Observable<Products[]>{
    return this.http.get<Products[]>(`http://localhost:4000/Products/${Product_id}`)
    
  }
  addProduct(Product:newProducts):Observable<AddedProductToCartSuccess>{
    console.log(Product)
    return this.http.post<AddedProductToCartSuccess>(`http://localhost:4000/Products`,Product,{headers: new HttpHeaders().set('token',this.token)})
  }
  
  updateProduct(product_id:string,product:newProducts):Observable<AddedProductToCartSuccess>{
    
    return this.http.put<AddedProductToCartSuccess>(`http://localhost:4000/Products/${product_id}`,{Product_id:product_id,...product},{headers: new HttpHeaders().set('token',this.token)})

  }


  deleteProduct(product_id:string):Observable<AddedProductToCartSuccess>{
    return this.http.delete<AddedProductToCartSuccess>(`http://localhost:4000/Products/${product_id}`,{headers: new HttpHeaders().set('token',this.token)})
  }

  }



