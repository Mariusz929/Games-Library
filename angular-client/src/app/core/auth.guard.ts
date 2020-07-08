import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const role = route.data.role as string;
    return this.checkLogin(url, role);
  }

  checkLogin(url: string, role: string) {
    if (this.authService.userLoggedIn()) {
      if (this.authService.userCanAccessPageWithRole(role)) {
        return true;
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    }

    // Storing attempted URL for redirecting
    this.authService.redirectURL = url;
    // log("niezalogowany");
    this.router.navigate(['/login']);
    return false;
  }

}
