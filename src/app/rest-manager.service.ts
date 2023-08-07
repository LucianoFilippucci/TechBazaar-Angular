import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestManagerService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  private makeRequest(serverAddress: string, servicePath: string, method: string, body: any, callback: any) {
    this.http.request(method, serverAddress + servicePath, body)
      .subscribe({
        next: (response: any) => {
          callback(true, response)
        },
        error: (response: any) => {
          callback(false, response);
        }
      });
  }

  private makeAuthorizedJsonRequest(serverAddress: string, servicePath: string, method: string, body: any, callback: any, isBody: boolean, token?: any) {
    let headers = new HttpHeaders();
    let requestPath = servicePath;
    if(token) {
      headers = headers.set("Authorization","Bearer " + token)
    }
    if(!isBody) {
      requestPath += "?"
      for(let key in body) {
        let value = body[key];
        requestPath += key + "=" + value + "&";
      }
    }

    this.http.request(method, serverAddress + requestPath, {body: body, headers: headers})
      .subscribe({
        next: (response: any) => {
          callback(true, response)
        },
        error: (response: any) => {
          callback(false, response);
        }
      });
  }

  public makeGetRequest(serverAddress: string, servicePath: string, body: any, callback: any) {
    let requestPath = servicePath + "?";
    for(let key in body) {
      let value = body[key];
      requestPath += key + "=" + value + "&";
    }

    return this.makeRequest(serverAddress, requestPath, "GET", body, callback);
  }

  public makeAuthorizedGetRequest(serverAddress: string, servicePath: string, body: any, token: string, isBody: boolean, callback: any) {
    let requestPath = servicePath + "?";
    for(let key in body) {
      let value = body[key];
      requestPath += key + "=" + value + "&";
    }
    return this.makeAuthorizedJsonRequest(serverAddress, requestPath, "GET", body, callback, isBody, token);
  }


  public makePostRequest(serverAddress: string, servicePath: string, body: any, callback: any) {
    let requestPath = servicePath + "?";
    for(let key in body) {
      let value = body[key];
      requestPath += key + "=" + value + "&";
    }

    return this.makeRequest(serverAddress, requestPath, "POST", body, callback);
  }

  public makeAuthorizedPostJsonRequest(serverAddress: string, servicePath: string, body: any, callback: any, isBody:boolean , token?: string) {
        return this.makeAuthorizedJsonRequest(serverAddress, servicePath, "POST", body, callback, isBody, token);
  }
}
