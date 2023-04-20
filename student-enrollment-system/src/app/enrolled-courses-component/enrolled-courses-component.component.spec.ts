import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCoursesComponentComponent } from './enrolled-courses-component.component';

describe('EnrolledCoursesComponentComponent', () => {
  let component: EnrolledCoursesComponentComponent;
  let fixture: ComponentFixture<EnrolledCoursesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledCoursesComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledCoursesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
