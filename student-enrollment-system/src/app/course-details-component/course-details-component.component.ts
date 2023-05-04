import { Component, OnInit } from '@angular/core';
import { CourseCatalogService } from '../services/courseServices';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../interfaces/Course';

@Component({
  selector: 'app-course-details-component',
  templateUrl: './course-details-component.component.html',
  styleUrls: ['./course-details-component.component.css']
})
export class CourseDetailsComponentComponent implements OnInit {

  items: Course[]=[]
  errorMessage: string = ""
  termId: any;
  courseId: any;
  coursename:any;
  discription:any;
  constructor(private courseCatalogService: CourseCatalogService, private cookieService: CookieService,private snackBar: MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.termId = this.route.snapshot.paramMap.get('Id');
    console.log(this.termId);
    this.courseCatalogService.getCourseDetails(this.termId).subscribe(data => {
     this.items=data;
     console.log(data);
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
