import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchComponentComponent } from './course-search-component.component';

describe('CourseSearchComponentComponent', () => {
  let component: CourseSearchComponentComponent;
  let fixture: ComponentFixture<CourseSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSearchComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
