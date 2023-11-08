import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuildFormService {

  private newInputControlSource = new Subject<any>();
  private setCallbackSource = new Subject<any>()

  private clearForm = new Subject<any>()

  newInputControl$ = this.newInputControlSource.asObservable();
  setCallback$ = this.setCallbackSource.asObservable();
  clearForm$ = this.clearForm.asObservable();


  constructor() { }
  setCallbackFunction(func : any) {
    this.setCallbackSource.next(func);
  }

  newInputControl(controlName : string, controlType: string, controlPlaceholder: string, value? : any) {
    let request = {
      name: controlName,
      type: controlType,
      placeholder: controlPlaceholder,
      value: value != null ? value : ""
    }
    this.newInputControlSource.next(request);
  }

  doClearForm(val? : string) {
    this.clearForm.next(val);
  }
}
