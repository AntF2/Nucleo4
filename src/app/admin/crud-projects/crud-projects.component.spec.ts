import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProjectsComponent } from './crud-projects.component';

describe('CrudProjectsComponent', () => {
  let component: CrudProjectsComponent;
  let fixture: ComponentFixture<CrudProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
