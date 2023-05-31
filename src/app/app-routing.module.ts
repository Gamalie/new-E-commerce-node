import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CartComponent } from './cart/cartComponent/cart.component';
import { SigninComponent } from './Forms/Signup/signin/signin.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [

{path:'',component:LandingPageComponent},
{path:'cart',component:CartComponent},
{path:'order',component:OrdersComponent},
{path:'signup',component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
