import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorProfileEditComponent } from './creator-profile-edit.component';

describe('CreatorProfileEditComponent', () => {
  let component: CreatorProfileEditComponent;
  let fixture: ComponentFixture<CreatorProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatorProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
