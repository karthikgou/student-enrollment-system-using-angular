import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogComponentComponent } from './course-catalog-component.component';

describe('CourseCatalogComponentComponent', () => {
  let component: CourseCatalogComponentComponent;
  let fixture: ComponentFixture<CourseCatalogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCatalogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCatalogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
