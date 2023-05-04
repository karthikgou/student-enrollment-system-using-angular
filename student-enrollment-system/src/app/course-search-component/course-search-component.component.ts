import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../interfaces/Course';

@Component({
  selector: 'app-course-search-component',
  templateUrl: './course-search-component.component.html',
  styleUrls: ['./course-search-component.component.css']
})
export class CourseSearchComponentComponent implements OnInit {

  items: Course[] = [];

  errorMessage: string = ""

  constructor(private courseCatalogService:CourseCatalogService,private cookieService: CookieService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @ViewChild('searchForm', { static: false })
  searchForm!: NgForm;

  filter(term: string, courseName: string, courseCode: string, instructorName: string, availableCourses: boolean,) {
    this.courseCatalogService.filterCourses(term, courseName, courseCode, instructorName, availableCourses).subscribe(data => {
      this.items = data;
      console.log(this.items);
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
          this.errorMessage = error.error.message;
          this.snackBar.open(this.errorMessage, 'Dismiss', {
            duration: 3000
          });
      });
    }
  }

}
