import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../Services/Products/products.service';



export interface Products{
  Product_id: number
  Product_name:string
  Product_description:string
  Product_price:number
  Product_image:string
 Category:string
}


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products:Products[] = []
 
  constructor(private productService:ProductsService) {
    this.products = this.productService.getAllProducts()
   
  }
  

}
