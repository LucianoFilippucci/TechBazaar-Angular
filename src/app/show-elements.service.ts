import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShowElementsService {
  private showNavBar = new BehaviorSubject<boolean>(true);
  constructor() {
  }

  getShowNav() {
    return this.showNavBar.asObservable();
  }

  update(newVal: boolean) {
    this.showNavBar.next(newVal);
  }

}
