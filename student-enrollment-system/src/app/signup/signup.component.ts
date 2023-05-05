import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseCatalogService } from '../services/courseServices';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  errorMessage: string = ""

  constructor(private formBuilder: FormBuilder, private courseCatalogService: CourseCatalogService, private router: Router, private cookieService: CookieService, private location: Location) {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  signup() {
    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;

    if(confirmPassword !== password) {
      return
    }

    const { fullname, email } = this.signupForm.value;
    this.courseCatalogService.userRegistration(fullname, email, password).subscribe((response) => {
      console.log(response._id);
      this.cookieService.set('userID', response._id, 1, '/');
      this.router.navigate(['/catalog']).then(() => {
        window.location.reload();
      });

    }, (error) => {
        this.errorMessage = error.error.message;
    });
  }

}
