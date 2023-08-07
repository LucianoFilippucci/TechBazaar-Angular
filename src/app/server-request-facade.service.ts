import { Injectable } from '@angular/core';
import {RestManagerService} from "./rest-manager.service";
import {HttpClient} from "@angular/common/http";
import {
  ADD_ELEM_TO_CART, CHECKOUT, CLEAR_CART,
  GET_CART,
  GET_SINGLE_PRODUCT,
  GET_USER_ORDER_LIST,
  LOGIN, REMOVE_CART_ELEMENT,
  SERVER_ADDRESS
} from "./Helpers/variables";

@Injectable({
  providedIn: 'root'
})
export class ServerRequestFacadeService {
  restManager: RestManagerService;
  constructor(http: HttpClient) {
    this.restManager = new RestManagerService(http);
  }


  getOrderList(userId: number, token: string ,callback: any) {
    this.restManager.makeAuthorizedGetRequest(SERVER_ADDRESS, GET_USER_ORDER_LIST, {userId: userId}, token, false,callback)
  }

  getProduct(productId: number, callback: any) {
    this.restManager.makeGetRequest(SERVER_ADDRESS, GET_SINGLE_PRODUCT, {productId: productId}, callback);
  }

  addElementToCart(productId: number, qty: number, cartId: string, callback: any, token: string) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      ADD_ELEM_TO_CART,
      {
        cartId: cartId,
        productId: productId,
        qty: qty
      },
      callback,
      false,
      token
      );
  }

  login(username: string, password: string, callback: any) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      LOGIN,
      {
        username: username,
        password: password
      },
      callback,
      false
    );
  }

  getCart(cartId: string, token: string, callback: any) {
    this.restManager.makeAuthorizedGetRequest(
      SERVER_ADDRESS,
      GET_CART,
      {
        cartId: cartId
      },
      token,
      true,
      callback
    );
  }

  clearCart(cartId: string, token: string, callback: any) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      CLEAR_CART,
      {
        cartId: cartId
      },
      callback,
      false,
      token
    )
  }

  checkOut(cartId: string, userAddressId: number, token: string, callback: any) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      CHECKOUT,
      {
        cartId: cartId,
        userAddressId: userAddressId
      },
      callback,
      false,
      token
    )
  }

  removeCartElement(cartId: string, productId: string, callback: any, token: string) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      REMOVE_CART_ELEMENT,
      {
        cartId: cartId,
        productId: productId,
        qty: 0
      },
      callback,
      false,
      token
    )
  }

}
