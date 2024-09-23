import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const decodedToken = this.authService.getDecodedToken();
    const userRole = decodedToken ? decodedToken.scope : null;

    if (expectedRole.includes(userRole)) {
      return true;
    } else {
      // this.router.navigate(['/unauthorized']);
      console.log('unauthorized')
      return false;
    }
  }
}
