import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService:CookieService) {}

   user_id = this.cookieService.get('userID');


  canActivate() {
    const isAuthenticated = (this.user_id !== undefined && this.user_id !== null && this.user_id !== '' ) ? true : false;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
}
