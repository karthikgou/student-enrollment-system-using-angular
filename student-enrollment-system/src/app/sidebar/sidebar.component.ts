import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private cookieService:CookieService, private router: Router, private location: Location) { }

  user_id = this.cookieService.get('userID');

  isAuthenticated = (this.user_id !== undefined && this.user_id !== null && this.user_id !== '' ) ? true : false;

  ngOnInit(): void {
  }

  opened=true;

  logoutFunctionality() {
    //remove user cookie

    this.cookieService.delete('userID');
    this.router.navigate(['/catalog']).then(() => {
      window.location.reload();
    });

  }

}
