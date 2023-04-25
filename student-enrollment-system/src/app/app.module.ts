import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

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
    CourseDetailsComponentComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatListModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
