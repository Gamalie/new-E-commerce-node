import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CartComponent } from './cart/cartComponent/cart.component';
import { SigninComponent } from './Forms/Signup/signin/signin.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './Forms/login/login.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductComponent } from './Forms/Add/update-product/update-product.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [

  {path:'',component:LandingPageComponent},
{path:'cart',component:CartComponent},
{path:'order',component:OrdersComponent},
{path:'signup',component:SigninComponent},
{path:'login',component:LoginComponent},
{path:'products',component:ProductsComponent},
{path:'admin',component:AdminComponent},
{path:'add',component:UpdateProductComponent},
{path: 'update/:id', component:UpdateProductComponent},
{path: '**', component:LandingPageComponent}
// AdminComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
