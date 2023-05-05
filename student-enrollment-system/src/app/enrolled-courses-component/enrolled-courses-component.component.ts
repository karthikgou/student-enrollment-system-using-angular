import { Component, OnInit } from '@angular/core';
import { CourseCatalogService } from '../services/courseServices';
import { CookieService } from 'ngx-cookie-service';
import { Course } from '../interfaces/Course';


@Component({
  selector: 'app-enrolled-courses-component',
  templateUrl: './enrolled-courses-component.component.html',
  styleUrls: ['./enrolled-courses-component.component.css']
})
export class EnrolledCoursesComponentComponent implements OnInit {

  items: Course[] = [];

  constructor(private courseCatalogService:CourseCatalogService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const user_id = this.cookieService.get('userID');
    this.courseCatalogService.getEnrolledCourses(user_id).subscribe(data => {

      this.items=data;
      console.log(this.items);
    });
  }

}
