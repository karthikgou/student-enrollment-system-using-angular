import { Component, OnInit } from '@angular/core';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-catalog-component',
  templateUrl: './course-catalog-component.component.html',
  styleUrls: ['./course-catalog-component.component.css']
})
export class CourseCatalogComponentComponent implements OnInit {

  items: any[]=[]

  errorMessage: string = ""


  constructor(private courseCatalogService: CourseCatalogService, private cookieService: CookieService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.courseCatalogService.getCoursesList().subscribe(data => {
      this.items=data;
    });
  }

  addToCartClick(courseId: string) {
    const user_id = this.cookieService.get('userID');
    if(user_id) {
      this.courseCatalogService.cartAPI(user_id, courseId).subscribe((response) => {
        this.snackBar.open('Course added to the cart Successfully.', 'Dismiss', {
          duration: 3000
        });
      }, (error) => {
        console.log(error);
          this.errorMessage = error.error.message;
          this.snackBar.open(this.errorMessage, 'Dismiss', {
            duration: 3000
          });
      });
    }
  }
}
