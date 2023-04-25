import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCatalogComponentComponent } from './course-catalog-component/course-catalog-component.component';
import { CourseSearchComponentComponent } from './course-search-component/course-search-component.component';
import { SavedCoursesComponentComponent } from './saved-courses-component/saved-courses-component.component';
import { EnrolledCoursesComponentComponent } from './enrolled-courses-component/enrolled-courses-component.component';
import { CourseDetailsComponentComponent } from './course-details-component/course-details-component.component';

const routes: Routes = [
  {
    path:"catalog", component:CourseCatalogComponentComponent
  },
  {
      path:"details",component:CourseDetailsComponentComponent
  },
  {
    path:"search",component:CourseSearchComponentComponent
  },
  {
    path:"cart", component:SavedCoursesComponentComponent
  },
  {
    path:"enrolled",component:EnrolledCoursesComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
