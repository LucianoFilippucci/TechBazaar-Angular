import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {Order} from "../models/order.model";
import {JwtDecoder} from "../Helpers/jwtDecoder";
import {LoginStateModel} from "../models/login-state.model";
import {AccountingService} from "../accounting.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orderList: Order[] = [];

  // @ts-ignore
  private user: LoginStateModel;
  constructor(private serverRequestFacade: ServerRequestFacadeService, private accountingService: AccountingService) {
    if(this.accountingService.isAuthenticated()) {
      this.user = this.accountingService.getUser();
    }
  }

  ngOnInit() {
    // @ts-ignore
    this.serverRequestFacade.getOrderList(this.user.id, this.user.token, this.showOrderList.bind(this))
  }

  public showOrderList(status: boolean, result: any) {
    if(status) {
      for(let i = 0; i < result.length; i++) {
        this.orderList.push(new Order(result[i].orderId, result[i].date, result[i].shippingAddr, result[i].orderTotal, result[i].orderStatus, result[i].products, result[i].canBeReturned));
      }
    }
  }
}
