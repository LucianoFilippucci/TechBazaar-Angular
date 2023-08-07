import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateCartService {
  private cartItemNumSubj = new Subject<number>();
  updateValue$ = this.cartItemNumSubj.asObservable();
  constructor() { }

  update(newVal: number) {
    let vv = localStorage.getItem("cartItemNum");
    if(vv != null) {
      let val = parseInt(vv);
      if(val != null) {
        val = newVal < 0 ? val - newVal : val + newVal;
        val = val < 0 ? 0 : val;
        localStorage.setItem("cartItemNum", val.toString());
        this.cartItemNumSubj.next(val);
      }
    }
  }

  getVal() {
    // @ts-ignore
    return parseInt(localStorage.getItem("cartItemNum"));
  }
}
