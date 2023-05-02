import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseCatalogService {

  constructor(private http: HttpClient) { }

  getCoursesList() {
    return this.http.get<any[]>('http://localhost:3000/courselist');
  }
}
