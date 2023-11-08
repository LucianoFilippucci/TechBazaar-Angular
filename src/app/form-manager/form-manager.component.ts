import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {BuildFormService} from "../build-form.service";

@Component({
  selector: 'app-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.css']
})
export class FormManagerComponent implements  OnInit {
  //@ts-ignore
  form : FormGroup;
  formInfos : any = []
  callbackFunction : any

  constructor(private builder : FormBuilder, private buildFormService : BuildFormService ) {
    this.buildFormService.newInputControl$.subscribe((request) => {
      this.addInput(request["name"], request["type"], request["placeholder"], request["value"])
    })

    this.buildFormService.setCallback$.subscribe((func) => {
      this.callbackFunction = func
    })

    this.buildFormService.clearForm$.subscribe((val) => {
      console.log("YAY")
      for(let controlKey in this.form.controls)
        this.form.removeControl(controlKey)

      this.formInfos = []
    })
  }

  ngOnInit() {
    this.form = this.builder.group({});
  }

  addInput(name: string, type : string, placeholder: string, value : any) {
    this.form.addControl(name, new FormControl)
    this.formInfos.push({
      name: name,
      type: type,
      placeholder: placeholder,
      value: value
    })
  }

  addCallbackFunction(func : any) {
    this.callbackFunction = func
  }

  get formControls() {
    return this.form.controls
  }

  submit() {
    let result: { [key: string]: any } = {}
    for (let controlsKey in this.form.controls) {

      result[controlsKey] = this.form.value[controlsKey]
    }

    this.callbackFunction(result)
    let modal = document.getElementById("modal_")
    if(modal != null)
      modal.style.display = "none";
  }
}
