import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorOneComponent } from './creator-one.component';

describe('CreatorOneComponent', () => {
  let component: CreatorOneComponent;
  let fixture: ComponentFixture<CreatorOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatorOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
