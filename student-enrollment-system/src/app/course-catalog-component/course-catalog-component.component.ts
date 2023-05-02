import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseCatalogService } from '../services/courseServices';
import { Course } from '../interfaces/Course';


@Component({
  selector: 'app-course-catalog-component',
  templateUrl: './course-catalog-component.component.html',
  styleUrls: ['./course-catalog-component.component.css']
})
export class CourseCatalogComponentComponent implements OnInit {



  items: any[]=[]

  constructor(private courseCatalogService: CourseCatalogService) { }

  ngOnInit(): void {
    this.courseCatalogService.getCoursesList().subscribe(data => {

      this.items=data;
      console.log(this.items);
    });
  }
}
