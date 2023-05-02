import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-course-catalog-component',
  templateUrl: './course-catalog-component.component.html',
  styleUrls: ['./course-catalog-component.component.css']
})
export class CourseCatalogComponentComponent implements OnInit {



  items: any[]=[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/courselist').subscribe(data => {

      this.items=data;
      console.log(this.items);
    });

    // console.log(this.item);
  }




}
