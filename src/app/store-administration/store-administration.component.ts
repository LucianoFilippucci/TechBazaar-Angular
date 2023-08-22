import {Component, OnInit} from '@angular/core';
import {AccountingService} from "../accounting.service";
import {ServerRequestFacadeService} from "../server-request-facade.service";
import {ToastService} from "../toast.service";
import {ShowElementsService} from "../show-elements.service";

@Component({
  selector: 'app-store-administration',
  templateUrl: './store-administration.component.html',
  styleUrls: ['./store-administration.component.css']
})
export class StoreAdministrationComponent implements OnInit {

  showComponent: String = "HOME"
  sideLink: HTMLCollectionOf<Element>;
  // @ts-ignore
  currElem: HTMLElement;
  constructor(private showElementsService: ShowElementsService, private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService) {
    this.showElementsService.update(false);
    this.sideLink = document.getElementsByClassName("side-link");

  }

  ngOnInit() {
    // @ts-ignore
    this.currElem = document.getElementById("home");
    this.currElem?.classList.add("link-active");
  }

  setInternalComponent(value: string, event: any) {
    this.showComponent = value;
    let elem = document.getElementById(event.target.attributes.id.value);
    this.currElem.classList.remove("link-active")
    // @ts-ignore
    elem.classList.add("link-active");
    // @ts-ignore
    this.currElem = elem;

  }

  logout() {
    this.accountingService.performLogout();
  }


}
