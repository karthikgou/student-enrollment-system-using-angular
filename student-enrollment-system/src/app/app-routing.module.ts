import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCatalogComponentComponent } from './course-catalog-component/course-catalog-component.component';
import { CourseSearchComponentComponent } from './course-search-component/course-search-component.component';
import { SavedCoursesComponentComponent } from './saved-courses-component/saved-courses-component.component';
import { EnrolledCoursesComponentComponent } from './enrolled-courses-component/enrolled-courses-component.component';
import { CourseDetailsComponentComponent } from './course-details-component/course-details-component.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './AuthGuard';


const routes: Routes = [
  {
    path:"catalog", component:CourseCatalogComponentComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
      path:"details",component:CourseDetailsComponentComponent, canActivate: [AuthGuard]
  },
  {
    path:"search",component:CourseSearchComponentComponent, canActivate: [AuthGuard]
  },
  {
    path:"cart", component:SavedCoursesComponentComponent, canActivate: [AuthGuard]
  },
  {
    path:"enrolled",component:EnrolledCoursesComponentComponent, canActivate: [AuthGuard]
  },
  {
    path:"details/:Id",component:CourseDetailsComponentComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
