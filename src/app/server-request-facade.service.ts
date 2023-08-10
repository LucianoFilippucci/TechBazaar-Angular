import { Injectable } from '@angular/core';
import {RestManagerService} from "./rest-manager.service";
import {HttpClient} from "@angular/common/http";
import {
  ADD_ELEM_TO_CART, CHECKOUT, CLEAR_CART, EDIT_REVIEW, FETCH_USER_REVIEW, GET_ALL_PRODUCT_PAGED_REVIEWS,
  GET_CART,
  GET_SINGLE_PRODUCT,
  GET_USER_ORDER_LIST, LIKE_REVIEW,
  LOGIN, NEW_REVIEW, REMOVE_CART_ELEMENT,
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

  removeCartElement(cartId: string, productId: number, callback: any, token: string) {
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

  getReviews(productId: number, page: number, pageSize: number, sortBy: string, callback: any) {
    this.restManager.makeGetRequest(
      SERVER_ADDRESS,
      GET_ALL_PRODUCT_PAGED_REVIEWS,
      {
        productId: productId,
        page: page,
        pageSize: pageSize,
        sortBy: sortBy
      },
      callback
    )
  }

  likeReview(reviewId: number, userId: number, callback: any, token: string) {
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      LIKE_REVIEW,
      {
        reviewId: reviewId,
        userId: userId
      },
      callback,
      false,
      token
    )
  }

  fetchUserReview(reviewId: number, callback: any, token: string) {
    this.restManager.makeAuthorizedGetRequest(
      SERVER_ADDRESS,
      FETCH_USER_REVIEW,
      {
        reviewId: reviewId
      },
      token,
      false,
      callback
    )
  }

  submitReview(userId: number, reviewTitle: string, reviewBody: string, callback: any, token: string, reviewId: number, productId: number, starCount: number) {
    let body: any;
    if(reviewId == -1) {
      body = {
        productId: productId,
        userId: userId,
        starCount: starCount,
        title: reviewTitle,
        body: reviewBody
      }
    } else {
      body = {
        reviewId: reviewId,
        title: reviewTitle,
        body: reviewBody,
        stars: starCount
      }
    }
    this.restManager.makeAuthorizedPostJsonRequest(
      SERVER_ADDRESS,
      reviewId == -1 ? NEW_REVIEW : EDIT_REVIEW,
      body,
      callback,
      false,
      token
    )
  }

}
