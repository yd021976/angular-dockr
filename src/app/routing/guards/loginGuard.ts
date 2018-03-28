import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class loginGuard implements CanActivate {
  private authObservable: Observable<boolean>;

  constructor(private _router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('loginGuard#canActivate called');
    // this.authObservable = this._appState.store.select(StateService.isAuthenticated);
    // this.authObservable.subscribe((authenticated) => {
    //   if (authenticated) {
    //     return true;
    //   } else {
    //     return this._router.navigate(['login']); // redirect to login pge if not authenticated
    //   }
    // });
    // return this.authObservable;
    return true;
  }
}