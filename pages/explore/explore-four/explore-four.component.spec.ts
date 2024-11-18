import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreFourComponent } from './explore-four.component';

describe('ExploreFourComponent', () => {
  let component: ExploreFourComponent;
  let fixture: ComponentFixture<ExploreFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreFourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
