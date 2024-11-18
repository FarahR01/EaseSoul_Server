import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorThreeComponent } from './creator-three.component';

describe('CreatorThreeComponent', () => {
  let component: CreatorThreeComponent;
  let fixture: ComponentFixture<CreatorThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatorThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
