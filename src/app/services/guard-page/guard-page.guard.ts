import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TesterService } from '../tester/tester.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPageGuard implements CanActivate {

  constructor(
    private testerServ: TesterService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.testerServ.isLoggednIn()) {
        const allowedRoles = next.data.role;
        const isAuthorized = this.testerServ.isRole(allowedRoles);
        if (!isAuthorized) {
          return false;
        }
        return true;
      }else {
        this.router.navigate(['visitor']);
        return false;
      }
  }
  
}
