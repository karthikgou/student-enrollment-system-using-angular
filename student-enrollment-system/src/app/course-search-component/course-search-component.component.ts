import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-course-search-component',
  templateUrl: './course-search-component.component.html',
  styleUrls: ['./course-search-component.component.css']
})
export class CourseSearchComponentComponent implements OnInit {

  items: any[] = [];

  errorMessage: string = ""

  constructor(private courseCatalogService:CourseCatalogService,private cookieService: CookieService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @ViewChild('searchForm', { static: false })
  searchForm!: NgForm;

  filter(term: string, courseName: string, courseCode: string, instructorName: string, availableCourses: boolean,) {
    // console.log('Term:', term);
    // console.log('Course Name:', courseName);
    // console.log('Course Code:', courseCode);
    // console.log('Instructor Name:', instructorName);
    // console.log('Available Courses:', availableCourses);

    this.courseCatalogService.filterCourses(term, courseName, courseCode, instructorName, availableCourses).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  addToCartClick(courseId: string) {
    console.log(courseId);
    const user_id = this.cookieService.get('userID');
    if(user_id) {
      this.courseCatalogService.cartAPI(user_id, courseId).subscribe((response) => {
        this.snackBar.open('Course added to the cart Successfully.', 'Dismiss', {
          duration: 3000
        });
      }, (error) => {
        console.log(error);
        if (error.status === 401) {
          this.errorMessage = error.error.message;
          this.snackBar.open(this.errorMessage, 'Dismiss', {
            duration: 3000
          });
        } else {
          // Other error, handle appropriately
        }
      });
    }
  }

}
