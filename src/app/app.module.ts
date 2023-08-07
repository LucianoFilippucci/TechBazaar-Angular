import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import {authenticationGuard} from "./auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    CartModalComponent,
    ProductComponent,
    OrdersComponent,
    LoginComponent,
    ProfileComponent,
    ModalComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'product/:id', component: ProductComponent},
            {path: 'user/orders', component: OrdersComponent, canActivate: [authenticationGuard('/login')]},
            //{path: 'user/orders', component: OrdersComponent},
            {path: 'login', component: LoginComponent},
            {path: 'user/profile', component: ProfileComponent, canActivate: [authenticationGuard('/login')]}
            // path: 'user/profile', component: ProfileComponent}
        ]),
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
