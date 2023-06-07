import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cartComponent/cart.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './Forms/Signup/signin/signin.component';
import { LoginComponent } from './Forms/login/login.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productReducer } from './State/Reducers/productReducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './State/Effects/productEffects';
import { CartEffects } from './State/Effects/cartEffects';
import { cartReducer } from './State/Reducers/cartReducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    
  ],
  imports: [
    ProductsComponent,
    UsersComponent,
    CartComponent,
    OrdersComponent,
    LoginComponent,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    SigninComponent,
    HttpClientModule,
    StoreModule.forRoot({product:productReducer,cart:cartReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ProductsEffects,CartEffects])
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
