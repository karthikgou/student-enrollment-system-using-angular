import { Component, OnInit } from '@angular/core';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../interfaces/Course';

@Component({
  selector: 'app-saved-courses-component',
  templateUrl: './saved-courses-component.component.html',
  styleUrls: ['./saved-courses-component.component.css']
})
export class SavedCoursesComponentComponent implements OnInit {

  items: Course[] = [];

  constructor(private courseCatalogService:CourseCatalogService, private cookieService: CookieService,  private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const user_id = this.cookieService.get('userID');
    this.courseCatalogService.getSavedCourses(user_id).subscribe(data => {

      this.items=data;
      console.log(this.items);
    });
  }

  enrollCourses(course_id:string) {
    const user_id = this.cookieService.get('userID');
    if(user_id) {
      this.courseCatalogService.enrollCourseAPI(user_id, course_id).subscribe((response) => {
        this.snackBar.open('Enrolled for the course Successfully.', 'Dismiss', {
          duration: 3000
        });
        window.location.reload();
      }, (error) => {
        console.log(error);
        if (error.status !== 200) {
          this.snackBar.open(error.error.message, 'Dismiss', {
            duration: 3000
          });
        } else {
          // Other error, handle appropriately
        }
      });
    }
  }

  removeFromCart(course_id:string) {
    const user_id = this.cookieService.get('userID');
    if(user_id) {
      this.courseCatalogService.removeCourseFromCartAPI(user_id, course_id).subscribe((response) => {
        this.snackBar.open('Removed course from the cart Successfully.', 'Dismiss', {
          duration: 3000
        });
        window.location.reload();
      }, (error) => {
        if (error.status !== 200) {
          this.snackBar.open(error.error.message, 'Dismiss', {
            duration: 3000
          });
        } else {
          // Other error, handle appropriately
        }
      });
    }
  }

}
