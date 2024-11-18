import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreThreeComponent } from './explore-three.component';

describe('ExploreThreeComponent', () => {
  let component: ExploreThreeComponent;
  let fixture: ComponentFixture<ExploreThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
