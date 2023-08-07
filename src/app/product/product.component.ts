import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {ToastService} from "../toast.service";
import {UpdateCartService} from "../update-cart.service";
import {LoginStateModel} from "../models/login-state.model";
import {LOGIN} from "../Helpers/variables";
import {AccountingService} from "../accounting.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number;
  product: Product | undefined;
  constructor(
    private activatedRouter: ActivatedRoute,
    private serverRequestFacade: ServerRequestFacadeService,
    private toastService: ToastService,
    private cartUiUpdate: UpdateCartService,
    private accountingService: AccountingService) {
    this.productId = activatedRouter.snapshot.params["id"];
    this.serverRequestFacade.getProduct(this.productId, this.showProduct.bind(this));
  }

  ngOnInit() {

  }

  public showProduct(status: boolean, result: any) {
    this.product = result["message"] as Product;
  }

  addToCart() {
    if(this.accountingService.isAuthenticated()) {
      // @ts-ignore
      let user = this.accountingService.getUser();
      if(user != false)
        this.serverRequestFacade.addElementToCart(this.productId, 1, user.cartId, this.showToast.bind(this), user.token);
    } else {
      this.toastService.show({message: "User Not Logged.", isError: true});
    }
  }

  showToast(status: boolean, result: any) {
    if(status){
      this.toastService.show({message: "Element Added to Cart.", isError: false});
      this.cartUiUpdate.update(1);
    }
  else
    this.toastService.show({message: "Error. Element not Added.", isError: true});
  }
}
