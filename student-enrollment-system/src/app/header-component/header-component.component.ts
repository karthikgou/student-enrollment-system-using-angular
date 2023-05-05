import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private cookieService:CookieService, private router: Router, private location: Location) { }

  user_id = this.cookieService.get('userID');

  isAuthenticated = (this.user_id !== undefined && this.user_id !== null && this.user_id !== '' ) ? true : false;

  ngOnInit(): void {
  }

  logoutFunctionality() {
    //remove user cookie

    this.cookieService.delete('userID');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }

  navigateToHome() {
    this.router.navigate(['/catalog'])
  }

}
