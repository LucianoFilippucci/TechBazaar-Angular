import {CanActivateFn, Router} from '@angular/router';
import {AccountingService} from "../accounting.service";
import {inject} from "@angular/core";
import {Subscription} from "rxjs";


export function authenticationGuard(redirectRoute: string): CanActivateFn {
  return () => {
    const accountingService: AccountingService = inject(AccountingService);
    const router: Router = inject(Router);

    let isLogged: boolean = accountingService.isAuthenticated();

    let user = accountingService.getUser();
    if(isLogged) {
      if(user.roles[0] === "ROLE_STORE")
        return true;
      return router.navigate([""]);
    } else {
      return router.navigate([redirectRoute]);
    }

  }
}
