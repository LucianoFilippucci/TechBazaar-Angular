import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CartModalComponent,
    ProductComponent,
    OrdersComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'product/:id', component: ProductComponent},
      {path: 'user/:id/orders', component: OrdersComponent},
      {path: 'login', component: LoginComponent},
      {path: 'user/profile', component: ProfileComponent}
    ]),
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
