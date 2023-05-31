import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import { RouterModule } from '@angular/router';

export interface Products{
  Product_id: number
  Product_name:string
  Product_description:string
  Product_price:number
  Product_image:string
 Category:string
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  // imports:[RouterModule],
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  products!:Products[]

  constructor(private productService:ProductsService){

  }
  ngOnInit(): void {
    this.products = this. productService.getAllProducts()
  }


}
