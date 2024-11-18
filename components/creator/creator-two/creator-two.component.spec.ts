import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorTwoComponent } from './creator-two.component';

describe('CreatorTwoComponent', () => {
  let component: CreatorTwoComponent;
  let fixture: ComponentFixture<CreatorTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatorTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
