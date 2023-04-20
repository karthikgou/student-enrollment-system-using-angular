import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCoursesComponentComponent } from './saved-courses-component.component';

describe('SavedCoursesComponentComponent', () => {
  let component: SavedCoursesComponentComponent;
  let fixture: ComponentFixture<SavedCoursesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCoursesComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCoursesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
