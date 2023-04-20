import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsComponentComponent } from './course-details-component.component';

describe('CourseDetailsComponentComponent', () => {
  let component: CourseDetailsComponentComponent;
  let fixture: ComponentFixture<CourseDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
