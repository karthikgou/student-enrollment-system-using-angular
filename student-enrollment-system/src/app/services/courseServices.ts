import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/Course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseCatalogService {

  constructor(private http: HttpClient) { }

  getCoursesList() {
    return this.http.get<any[]>('http://localhost:3000/courselist');
  }

  filterCourses(term1: string, courseName1: string, courseCode1: string, instructorName1: string, availableCourses1: boolean): Observable<Course[]> {
    const data = {
      term: term1,
      courseName: courseName1,
      courseCode: courseCode1,
      instructorName: instructorName1,
      availableCourses: availableCourses1
    };

    console.log(data);

    return this.http.post<any[]>('http://localhost:3000/filteredCourses', data);
}

getCourseDetails(doc_id:string) {
  const data={id:doc_id};
  return this.http.post<any[]>('http://localhost:3000/getCourseDetails',data);
}

}
