import {ChangeDetectorRef, Component} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {AccountingService} from "../../accounting.service";
import {ServerRequestFacadeService} from "../../server-request-facade.service";
import {ToastService} from "../../toast.service";
import {LoginStateModel} from "../../models/login-state.model";
import {NgForm} from "@angular/forms";
import {BuildFormService} from "../../build-form.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatTab} from "@angular/material/tabs";;


export interface Data {
  id: number
  name: string
  description: string
  category: string
  price: number
  quantity: number
  totalSold: number
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  storeProducts: Data[] = [];

  store: LoginStateModel | undefined;

  // @ts-ignore
  dataSource : any

  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'price', 'quantity', 'totalSold', 'actions']

  //modalElements : any[]

  constructor(private cdr: ChangeDetectorRef, private accountingService: AccountingService, private serverRequest: ServerRequestFacadeService, private toastService: ToastService, private buildFormService: BuildFormService) {


    if(this.accountingService.isAuthenticated()) {


      this.store = this.accountingService.getUser();
      if(this.store != undefined) {
        this.serverRequest.getStoreProducts(this.store.id, (status: boolean, response: any) => {
          if (status) {
            let test = response;
            for(let i = 0; i < response.length; i++) {
              //this.storeProducts.push(new ProductModel(response[i]["productName"], response[i]["productDescription"], response[i]["productCategory"], response[i]["productPrice"], response[i]["productQuantity"], this.store, response[i]["productTotalSelt"], response[i]["productId"]));
              let l : Data = {
                id: response[i]["productId"],
                name: response[i]["productName"],
                totalSold: response[i]["productTotalSelt"],
                category: response[i]["productCategory"],
                quantity: response[i]["productQuantity"],
                price: response[i]["productPrice"],
                description: response[i]["productDescription"]
              }
              this.storeProducts.push(l)
            }
            //this.dataSource = new MatTableDataSource(this.storeProducts)
            //console.log(this.dataSource)
            this.dataSource = this.storeProducts
          }

        });
      }
    }
  }

  newProduct() {
    if(this.accountingService.isAuthenticated()) {
      // let modal = document.getElementById("modal_");
      // if (modal != null)
      //   modal.style.display = "block";
      // let modalTitle = document.getElementById("modalTitle");
      // if(modalTitle != null) {
      //   modalTitle.innerText = "New Product";
      // }

      this.showModal()
      this.buildFormService.newInputControl("productName", "text", "Product Name");
      this.buildFormService.newInputControl("productCategory", "text", "Product Category");
      this.buildFormService.newInputControl("productDescription", "text", "Product Description");
      this.buildFormService.newInputControl("productPrice", "number", "Product Price");
      this.buildFormService.newInputControl("productQuantity", "number", "Product Quantity");
      this.buildFormService.setCallbackFunction(this.submitForm.bind(this))
    }
  }

  private showModal() {
    let modal = document.getElementById("modal_");
    if (modal != null)
      modal.style.display = "block";
    let modalTitle = document.getElementById("modalTitle");
    if(modalTitle != null) {
      modalTitle.innerText = "New Product";
    }
  }

  // @ts-ignore

  submitForm(result: any) {

    if (this.accountingService.isAuthenticated()) {
      //@ts-ignore
      let id = this.store.id
      //@ts-ignore
      let token = this.store.token

      this.serverRequest.newProduct(
        result["productName"],
        result["productDescription"],
        result["productCategory"],
        result["productPrice"],
        result["productQuantity"],
        id,
        token,
        (status: boolean, response: any) => {
          if (status) {
            // @ts-ignore
            let id = this.store.id;
            let l : Data = {
              id: response["productId"],
              name: response["productName"],
              description: response["productDescription"],
              category: response["productCategory"],
              price: response["productPrice"],
              totalSold: response["productTotalSelt"],
              quantity: response["productQuantity"]

            }
            // this.storeProducts.push(new ProductModel(
            //   response["productName"],
            //   response["productDescription"],
            //   response["productCategory"],
            //   response["productPrice"],
            //   response["productQuantity"],
            //   id,
            //   response["productTotalSelt"],
            //   response["id"]
            // ))


            this.toastService.show({message: "Product Inserted.", isError: false});
          } else {
            this.toastService.show({message: "Error Occurred.", isError: true});
          }
        });
    }
  }

  deleteProduct(productId: number) {
    let cartModal = document.getElementById("modal_");
    if(cartModal != null)
      cartModal.style.display = "none";
    //TODO: modal to confirm.
    if(confirm("Ya Sure?")) {

      // @ts-ignore
      let id = this.store.id;
      // @ts-ignore
      let token = this.store.token;
      this.serverRequest.deleteProduct(productId, id, token, (status: boolean, response: any) => {
        if(status) {
          for(let i = 0; i < this.storeProducts.length; i++){
            if(this.storeProducts[i].id == productId) {
              this.storeProducts.splice(i, 1);
              this.toastService.show({ message: "Product Deleted.", isError: false });
            }
          }
        } else {
          this.toastService.show({ message: "Error Occurred.", isError: true });
        }
      });
    }
  }

  editProduct(productId: number) {

    let selected : Data
    this.storeProducts.forEach((value) => {
      if(value.id == productId)
        selected = value
    })

    this.showModal()

    // @ts-ignore
    if(selected != null) {
      this.buildFormService.newInputControl("productName", "text", "Product Name", selected.name);
      this.buildFormService.newInputControl("productCategory", "text", "Product Category", selected.category);
      this.buildFormService.newInputControl("productDescription", "text", "Product Description", selected.description);
      this.buildFormService.newInputControl("productPrice", "number", "Product Price", selected.price);
      this.buildFormService.newInputControl("productQuantity", "number", "Product Quantity", selected.quantity);
      this.buildFormService.setCallbackFunction(this.submitEdit.bind(this))

    }
  }

  private submitEdit(result : any) {
    if (this.accountingService.isAuthenticated()) {
      //@ts-ignore
      let id = this.store.id
      //@ts-ignore
      let token = this.store.token

      this.serverRequest.editProduct(
        result["id"],
        id,
        token,
        result["productName"],
        result["productCategory"],
        result["productDescription"],
        result["productPrice"],
        result["productQuantity"],
        (status: boolean, response: any) => {
          if(status) {
            this.toastService.show({message: "Product Edited", isError: false});
            // refresh productList
          } else
            this.toastService.show({message: "Error.", isError: true});
        });
    }
  }


}
