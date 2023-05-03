import { Component, OnInit } from '@angular/core';
import { CourseCatalogService } from '../services/courseServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details-component',
  templateUrl: './course-details-component.component.html',
  styleUrls: ['./course-details-component.component.css']
})
export class CourseDetailsComponentComponent implements OnInit {

  items: any[]=[]
  termId: any;
  courseId: any;
  coursename:any;
  discription:any;
  constructor(private courseCatalogService: CourseCatalogService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.termId = this.route.snapshot.paramMap.get('Id');
    console.log(this.termId);
    this.courseCatalogService.getCourseDetails(this.termId).subscribe(data => {

     this.items=data;
    //  this.coursename=data[0]['name'];
    //  this.discription=data[0] ['description'];
     console.log(data);


    });

    // console.log(this.items)


    // console.log(this.termId);
    // console.log(this.courseId);




  }

}
