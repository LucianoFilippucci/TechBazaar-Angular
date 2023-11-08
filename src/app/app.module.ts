import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { LoginComponent } from './login/login.component';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import {authenticationGuard} from "./auth/auth.guard";
import { ReviewComponent } from './review/review.component';
import { StoreAdministrationComponent } from './store-administration/store-administration.component';
import { ProductsComponent } from './store-administration/products/products.component';
import { StoreOrdersComponent } from './store-administration/store-orders/store-orders.component';
import { StoreOrderDetailsComponent } from './store-administration/store-order-details/store-order-details.component';
import { PromotionsComponent } from './store-administration/promotions/promotions.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { FormManagerComponent } from './form-manager/form-manager.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatBadgeModule} from "@angular/material/badge";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { InfoComponent } from './profile/info/info.component';
import {MatButtonModule} from "@angular/material/button";
import { WishlistComponent } from './profile/wishlist/wishlist.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    CartModalComponent,
    ProductComponent,
    OrdersComponent,
    LoginComponent,
    ProfileComponent,
    ReviewComponent,
    StoreAdministrationComponent,
    ProductsComponent,
    StoreOrdersComponent,
    StoreOrderDetailsComponent,
    PromotionsComponent,
    GenericModalComponent,
    FormManagerComponent,
    ProductsComponent,
    InfoComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'product/:id', component: ProductComponent},
      //{ path: 'user/orders', component: OrdersComponent, canActivate: [authenticationGuard('/login')] },
      {path: 'user/orders', component: OrdersComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [authenticationGuard('/login', "user/profile")]
      },
      {
        path: 'store/administration',
        component: StoreAdministrationComponent,
        canActivate: [authenticationGuard('/', "store/administration")]
      },
      {path: 'user/profile', component: ProfileComponent},
      {path: 'form/test', component: FormManagerComponent},
      {path: 'user/wishlist', component: WishlistComponent}
    ]),
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
