import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTeachersComponent } from './crud-teachers.component';

describe('CrudTeachersComponent', () => {
  let component: CrudTeachersComponent;
  let fixture: ComponentFixture<CrudTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
