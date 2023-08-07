import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private showToastSubject = new Subject<string>();
  showToast$ = this.showToastSubject.asObservable();
  constructor() { }

  show(message: any) {
    this.showToastSubject.next(message);
  }
}
