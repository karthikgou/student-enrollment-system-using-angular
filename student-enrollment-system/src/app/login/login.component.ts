import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = ""

  constructor(private formBuilder: FormBuilder, private courseCatalogService:CourseCatalogService, private router: Router, private cookieService: CookieService, private location: Location) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.courseCatalogService.loginAuthentication(email, password).subscribe((response) => {
      console.log(response._id);
      this.cookieService.set('userID', response._id, 1, '/');
      this.router.navigate(['/catalog']).then(() => {
        window.location.reload();
      });
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      } else {
        // Other error, handle appropriately
      }
    });
  }
}

