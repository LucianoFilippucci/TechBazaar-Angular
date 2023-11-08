import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateCartService {
  private cartItemNumSubj = new Subject<number>();
  updateValue$ = this.cartItemNumSubj.asObservable();

  constructor() { }

  update(newVal: any) {
    let vv = localStorage.getItem("cartElems");
    if(vv != null) {
      let val = Number(vv);
      if(val != null) {
        if(newVal == "CLEAR")
          val = 0
        else {
          val = Number(newVal) < 0 ? val - Number(newVal) : val + Number(newVal);
          val = val < 0 ? 0 : val;
        }
        localStorage.setItem("cartElems", val.toString());
        this.cartItemNumSubj.next(val);
      }
    }
  }

  getVal() {
    // @ts-ignore
    return parseInt(localStorage.getItem("cartElems"));
  }
}
