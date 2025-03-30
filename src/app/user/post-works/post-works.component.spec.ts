import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWorksComponent } from './post-works.component';

describe('PostWorksComponent', () => {
  let component: PostWorksComponent;
  let fixture: ComponentFixture<PostWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
