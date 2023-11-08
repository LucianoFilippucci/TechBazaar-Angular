import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {AccountingService} from "../../accounting.service";
import {ToastService} from "../../toast.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {LoginStateModel} from "../../models/login-state.model";
import {ProductModel} from "../../models/product.model";
import {ProductComponent} from "../../product/product.component";
import {UpdateCartService} from "../../update-cart.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  totalItems: number = 10
  index: number = 0
  showFirstLastButton = true

  //@ts-ignore
  user: LoginStateModel

  wishlist: ProductModel[] = []

  displayedColumns: string[] = ['img', 'name', 'price', 'actions']
  constructor(private accountingService: AccountingService, private toastService: ToastService, private serverService: ServerRequestFacadeService, private cartUI: UpdateCartService) {
    if(this.accountingService.isAuthenticated()) {
      this.user = this.accountingService.getUser()
      this.serverService.getWishlist(this.user.id, this.user.token, (status: boolean, result: any) => {
        this.wishlist = result;

        this.totalItems = this.wishlist.length;
      });
    }
  }

  update(pe: PageEvent) {
    console.log(pe.pageIndex)
  }

  editProduct(id: number) {
    if(this.accountingService.isAuthenticated()){
      this.serverService.removeFromWishlist(this.user.id, id, this.user.token, (status: boolean, response: any) => {
        if(status){
          for(let i = 0; i < this.wishlist.length; i++) {
            if(this.wishlist[i].id == id) {
              this.wishlist.splice(i, 1);
              this.toastService.show({message: "Item Removed from Wishlist.", isError: false})
              break;
            }
          }
        } else {
          this.toastService.show({message: "Could not Delete Item.", isError: true})
        }
      });
    }
  }

  addToCart(id: number) {
    if(this.accountingService.isAuthenticated()) {
      this.serverService.addElementToCart(id, 1, this.user.cartId, (status: boolean, response: any) => {
        if(status) {
          this.toastService.show({message: "Product Added To Cart.", isError: false});
          this.cartUI.update(1);
        } else {
          this.toastService.show({message: "Could not add Product.", isError: true});
        }
      }, this.user.token);
    }
  }
}
