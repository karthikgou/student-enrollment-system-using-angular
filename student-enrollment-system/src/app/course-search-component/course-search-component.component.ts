import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseCatalogService } from '../services/courseServices';


@Component({
  selector: 'app-course-search-component',
  templateUrl: './course-search-component.component.html',
  styleUrls: ['./course-search-component.component.css']
})
export class CourseSearchComponentComponent implements OnInit {

  items: any[] = [];

  constructor(private courseCatalogService:CourseCatalogService) { }

  ngOnInit(): void {
  }

  @ViewChild('searchForm', { static: false })
  searchForm!: NgForm;

  filter(term: string, courseName: string, courseCode: string, instructorName: string, availableCourses: boolean) {
    console.log('Term:', term);
    console.log('Course Name:', courseName);
    console.log('Course Code:', courseCode);
    console.log('Instructor Name:', instructorName);
    console.log('Available Courses:', availableCourses);

    this.courseCatalogService.filterCourses(term, courseName, courseCode, instructorName, availableCourses).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

}
