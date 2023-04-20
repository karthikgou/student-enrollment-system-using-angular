import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { CourseCatalogComponentComponent } from './course-catalog-component/course-catalog-component.component';
import { CourseSearchComponentComponent } from './course-search-component/course-search-component.component';
import { SavedCoursesComponentComponent } from './saved-courses-component/saved-courses-component.component';
import { EnrolledCoursesComponentComponent } from './enrolled-courses-component/enrolled-courses-component.component';
import { CourseDetailsComponentComponent } from './course-details-component/course-details-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    ProfileComponentComponent,
    CourseCatalogComponentComponent,
    CourseSearchComponentComponent,
    SavedCoursesComponentComponent,
    EnrolledCoursesComponentComponent,
    CourseDetailsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
